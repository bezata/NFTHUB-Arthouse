import React, { useState, useEffect } from "react";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import nfthubABI from "./abi/NFTHUB.json";
import { UploadFileToIPFS } from "./Dropzone";

<<<<<<< Updated upstream
const NFTHUB_ADDRESS = "0xCD387b47A57bb57C99Ef1Aa578019C9253b845eA";
=======
const NFTHUB_ADDRESS = "0x0c5d5A9009E45Ee9eE7e30Dac5257DD836c4a98A";
>>>>>>> Stashed changes

function NFTHUBComponent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [listingPrice, setListingPrice] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [isNFTCreated, setIsNFTCreated] = useState(false);
<<<<<<< Updated upstream
=======
  const [isCreatingNFT, setIsCreatingNFT] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

>>>>>>> Stashed changes
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
      const { success, pinataURL } = await UploadFileToIPFS(file);
      if (success) {
<<<<<<< Updated upstream
        setTokenURI(pinataURL);
        setUploadError(false);
=======
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
>>>>>>> Stashed changes
      }
    } catch (error) {
      // handle the error
    }
  }

  function handleButtonClick() {
    const fileInput = document.getElementById("file-upload");
    const file = fileInput.files[0];
    if (file) {
      handleFileUpload(file);
    } else {
      setUploadError(true);
    }
  }

  const { config: listConfig, error: listError } = usePrepareContractWrite({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "listNFT",
    args: [name, description, tokenURI],
    value: listingPrice,
    overrides: {
      value: listingPrice.toString(),
    },
  });

  const {
    data: txData,
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
      await listNFT?.();
      setIsNFTCreated(true);
    } catch (error) {}
  };
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center">
      <h2 className="text-5xl font-bold text-gray mb-8">Create NFT!</h2>
      <div className="bg-white bg-gradient-to-r from-purple-100 to-indigo-100  rounded-lg p-8 shadow-lg flex flex-col items-center">
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
          <label className="absolute top-0 left-2 px-1 text-gray-500 font-bold text-xs transform origin-left transition-all ">
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
            className="border-2 border-gray-400 rounded-lg p-2 w-full text-gray-500 font-bold text-xs transform origin-left transition-all placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
            htmlFor="file-upload"
          >
            {tokenURI ? "File uploaded" : "Upload File"}
          </label>
        </div>
        {uploadError && (
          <p className="text-red-500 mt-2">Please select a file to upload</p>
        )}
        <div className="flex items-center justify-between w-80 mb-4">
          <p className="text-gray-500  font-bold text-xs transform origin-left transition-all">
            Listing Fee:
          </p>
          <p className="font-bold ml-2 text-gray-500  text-xs transform origin-left transition-all">
            {listingPrice.toString()} GCELO
          </p>
        </div>
<<<<<<< Updated upstream
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={handleButtonClick}
        >
          Upload Image
        </button>
=======
>>>>>>> Stashed changes
        <button
          className="mt-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          onClick={handleListNFT}
          disabled={!tokenURI || loading}
        >
          {loading ? "Creating NFT..." : "Create NFT"}
        </button>
        {success && (
<<<<<<< Updated upstream
          <p className="text-green-500 mt-4">NFT created successfully!</p>
        )}
        {isNFTCreated && (
          <>
            <p className="text-green-500 mt-4">Your NFT has been created!</p>
            <a
              href={`${tokenURI}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2"
            >
              View on IPFS
            </a>
=======
          <>
            <p className="text-green-500 mt-4">NFT created successfully!</p>
            {transactionHash && (
              <a
                href={`https://explorer.celo.org/alfajores/tx/${transactionHash}`}
              >
                Look at the transaction!
              </a>
            )}
>>>>>>> Stashed changes
          </>
        )}
      </div>
    </div>
  );
}

export default NFTHUBComponent;
