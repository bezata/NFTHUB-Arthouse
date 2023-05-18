import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import nfthubABI from "./abi/NFTHUB.json";
import NFTCard from "./NFTCard";

const NFTHUB_ADDRESS = "0x0c5d5A9009E45Ee9eE7e30Dac5257DD836c4a98A";

const NFTList = () => {
  const [itemsData, setItemsData] = useState([]);
  const { data: fetchAllItems } = useContractRead({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "getAllItems",
  });

  useEffect(() => {
    const fetchMetadata = async () => {
      if (fetchAllItems) {
        const metadata = await Promise.all(
          fetchAllItems.map(async ({ id, minter, nftAddress, tokenId, tokenURI }) => {
            // Fetch the JSON metadata from IPFS
            const res = await fetch(tokenURI);
            const metadata = await res.json();

            return {
              id,
              minterAddress: minter,
              nftAddress,
              tokenId,
              metadata: {
                name: metadata.name || "",
                description: metadata.description || "",
                image: metadata.image || "",
              },
            };
          })
        );
        setItemsData(metadata);
      }
    };
    fetchMetadata();
  }, [fetchAllItems]);

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {itemsData.map((itemData, index) => (
        <div key={index} className="p-2 ">
          <NFTCard
            name={itemData.metadata.name}
            description={itemData.metadata.description}
            image={itemData.metadata.image}
            minterAddress={itemData.minterAddress}
          />
        </div>
      ))}
    </div>
  );
};

export default NFTList;