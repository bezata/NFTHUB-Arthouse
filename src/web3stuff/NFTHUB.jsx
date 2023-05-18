import React, { useState, useEffect } from "react";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import nfthubABI from "./abi/NFTHUB.json";
import { UploadFileToIPFS, UploadJSONToIPFS } from "./Dropzone";

const NFTHUB_ADDRESS = "0xd1ADB5EB0DA3EAed6D676E3139C68d6fE77e7eaa";

function NFTHUBComponent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [listingPrice, setListingPrice] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [isNFTCreated, setIsNFTCreated] = useState(false);
  const [isCreatingNFT, setIsCreatingNFT] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  const { data } = useContractRead({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "getListingPrice",
    onSuccess(data) {
      let newListingPrice = data.toNumber();
      setListingPrice(newListingPrice);
    },
  });

  async function handleFileUpload(file) {
    try {
      setIsUploadingImage(true);
      const { success, pinataURL } = await UploadFileToIPFS(file);
      if (success) {
        const metadata = {
          name: name,
          description: description,
          image: pinataURL,
        };
        const pinataMetadata = {
          name: name,
          description: description,
          image: pinataURL,
        };

        const { success: jsonSuccess, pinataURLJSON } = await UploadJSONToIPFS(
          metadata,
          pinataMetadata
        );
        if (jsonSuccess) {
          setTokenURI(pinataURLJSON);
          setUploadError(false);
        }
      }
      setIsUploadingImage(false);
    } catch (error) {
      setIsUploadingImage(false);
      // handle the error
    }
  }

  const { config: listConfig, error: listError } = usePrepareContractWrite({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "listNFT",
    args: [tokenURI],
    value: listingPrice,
    overrides: {
      value: listingPrice.toString(),
    },
  });

  const {
    data: listtx,
    isLoading: loading,
    isSuccess: success,
    write: listNFT,
  } = useContractWrite(listConfig);

  useEffect(() => {
    if (success && listtx && listtx.hash) {
      setTransactionHash(listtx.hash);
    }
  }, [success, listtx]);

  const handleListNFT = async () => {
    if (!tokenURI) {
      setUploadError(true);
      return;
    }
    try {
      setIsCreatingNFT(true);
      await listNFT?.();
      setIsNFTCreated(true);
    } catch (error) {
      setIsCreatingNFT(false);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center">
      <h2 className="text-5xl font-bold bg-gradient-to-r  text-gray mb-8">
        Create Your NFT
      </h2>
      <div className="bg-white rounded-lg p-8 bg-gradient-to-r from-purple-100 to-indigo-100 shadow-lg flex flex-col items-center">
        <div className="relative mb-4 w-80">
          <input
            className="border-2 border-gray-400 rounded-lg p-2 w-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            type="text"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="absolute top-0 left-2 px-1 text-gray-500 font-bold text-xs transform origin-left transition-all">
            Name
          </label>
        </div>
        <div className="relative mb-4 w-80">
          <input
            className="border-2 border-gray-400 rounded-lg p-2 w-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            type="text"
            placeholder=" "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="absolute top-0 left-2 px-1 text-gray-500 font-bold text-xs transform origin-left transition-all">
            Description
          </label>
        </div>
        <div className="relative mb-4 w-80">
          <input
            className="hidden"
            type="file"
            id="file-upload"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
          <label
            className="border-2 border-gray-400 rounded-lg p-2 w-full text-gray-800 px- font-bold text-xs transform origin-left transition-all placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            htmlFor="file-upload"
          >
            {tokenURI ? "File uploaded" : "Upload File"}
          </label>
        </div>
        {uploadError && (
          <p className="text-red-500 mt-2">Please select a file to upload</p>
        )}
        <div className="flex items-center justify-between w-80 mb-4">
          <p className="text-gray-500 px-1  font-bold text-xs transform origin-left transition-all">
            Listing Fee:
          </p>
          <p className="font-bold ml-2 px-1 text-gray-500 text-xs transform origin-left transition-all">
            {listingPrice.toString()} GCELO
          </p>
        </div>
        <button
          className="mt-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={handleListNFT}
          disabled={!tokenURI || loading || isUploadingImage}
        >
          {isUploadingImage ? "Uploading Image..." : "Create NFT"}
        </button>
        {success && (
          <>
            <p className="text-green-500 mt-4">NFT created successfully!</p>
            <a href={`https://explorer.celo.org/alfajores/tx/${listtx}`}>
              {" "}
              Look at the transaction!
            </a>
          </>
        )}
      </div>
    </div>
  );
}


export default NFTHUBComponent;
