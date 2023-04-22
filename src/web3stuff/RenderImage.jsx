import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import nfthubABI from "./abi/NFTHUB.json"; // Import the ABI for your contract
const NFTImage = () => {
  const [imageData, setImageData] = useState(null);
  const NFTHUB_ADDRESS = "0x0C2a027e4f927fFd5Ff7b956B5b4c1F3813Bd763"; // Replace with your deployed contract address
  const { data: fetchItem } = useContractRead({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "fetchItemImage",
    args: [3],
  });

  useEffect(() => {
    if (fetchItem) {
      setImageData(fetchItem); // Set the image data (tokenURI) from the fetched data
    }
  }, [fetchItem]);
  console.log(fetchItem);

  return (
    <div>
      {imageData ? (
        <img src={imageData} alt="a" width="300" height="200" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default NFTImage;
