import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import nfthubABI from "./abi/NFTHUB.json";
import NFTCard from "./NFTCard";

const NFTHUB_ADDRESS = "0xd1ADB5EB0DA3EAed6D676E3139C68d6fE77e7eaa";

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