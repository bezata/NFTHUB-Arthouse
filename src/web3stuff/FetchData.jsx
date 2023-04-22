import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import nfthubABI from "./abi/NFTHUB.json";
import NFTCard from "./NFTCard";

const NFTHUB_ADDRESS = "0x49032164dB337312555bA6b562d2e8602fc57bD1";

const NFTList = () => {
  const [itemsData, setItemsData] = useState([]);
  const { data: fetchAllItems } = useContractRead({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "getAllItems",
  });
  useEffect(() => {
    if (fetchAllItems) {
      setItemsData(fetchAllItems);
    }
  }, [fetchAllItems]);
  console.log(itemsData);
  return (
    <div className="flex flex-row flex-wrap justify-center">
      {itemsData.map((itemData, index) => (
        <div key={index} className="p-2 ">
          <NFTCard
            name={itemData.name}
            description={itemData.description}
            image={itemData.tokenURI}
            minterAddress={itemData.minter}
          />
        </div>
      ))}
    </div>
  );
};

export default NFTList;
