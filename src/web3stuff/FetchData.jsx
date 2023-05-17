import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import nfthubABI from "./abi/NFTHUB.json";
import NFTCard from "./NFTCard";

const NFTHUB_ADDRESS = "0xf38E4A2DDa3db2b628888c0eD736E7Bc6c61954E";

const NFTList = () => {
  const [itemsData, setItemsData] = useState([]);
  const { data: fetchAllItems } = useContractRead({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "getAllItems",
    watch: true,
  });
  console.log(fetchAllItems);

  useEffect(() => {
    async function fetchNFTMetadata() {
      const updatedItemsData = await Promise.all(
        fetchAllItems.map(async (itemData) => {
          const metadataResponse = await fetch(itemData.tokenURI);
          const metadataJson = await metadataResponse.json();
          return {
            id: itemData.id.toString(),
            tokenId: itemData.tokenId.toString(),
            nftAddress: itemData.nftAddress,
            minter: itemData.minter,
            tokenURI: itemData.tokenURI,
            name: metadataJson.name || "",
            description: metadataJson.description || "",
            image: metadataJson.image || "",
          };
        })
      );
      setItemsData(updatedItemsData);
    }
    if (fetchAllItems) {
      fetchNFTMetadata();
    }
  }, [fetchAllItems]);

  return (
    <div className="flex flex-row flex-wrap justify-center">
      {itemsData.map((itemData, index) => (
        <div key={index} className="p-2 ">
          <NFTCard
            name={itemData.name}
            description={itemData.description}
            image={itemData.image}
            minterAddress={itemData.minter}
          />
        </div>
      ))}
    </div>
  );
};

export default NFTList;