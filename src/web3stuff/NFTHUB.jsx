import React, { useState } from "react";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import nfthubABI from "./abi/NFTHUB.json"; // Import the ABI for your contract
import { UploadFileToIPFS } from "./Dropzone";
const NFTHUB_ADDRESS = "0x49032164dB337312555bA6b562d2e8602fc57bD1"; // Replace with your deployed contract address

function NFTHUBComponent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [listingPrice, setListingPrice] = useState(0);
  const [uploadError, setUploadError] = useState(false);

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
        setTokenURI(pinataURL);
        setUploadError(false); // Reset the error state if file upload is successful
      }
    } catch (error) {
      console.error(error);
      // handle the error
    }
  }

  function handleButtonClick() {
    const fileInput = document.getElementById("file-upload");
    const file = fileInput.files[0];
    if (file) {
      handleFileUpload(file);
    } else {
      setUploadError(true); // Set the error state if no file is selected
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

  const handleListNFT = async () => {
    if (!tokenURI) {
      setUploadError(true); // Set the error state if no file has been uploaded yet
      return;
    }
    try {
      await listNFT?.();
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <head>
        <link href="/dist/output.css" rel="stylesheet" />
      </head>
      <h2 className="text-3xl font-bold mb-8">List NFT</h2>
      <div className="flex flex-col items-center">
        <input
          className="border border-gray-400 rounded-lg p-2 mb-4 w-80"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-gray-400 rounded-lg p-2 mb-4 w-80"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="border border-gray-400 rounded-lg py-2 px-4 mb-4"
          type="file"
          id="file-upload"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          Upload File
        </button>
        {uploadError && (
          <p className="text-red-500 mt-2">Please select a file to upload</p>
        )}
        <div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleListNFT}
          >
            List NFT
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default NFTHUBComponent;
