import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import nfthubABI from "./abi/NFTHUB.json";
import NFTCard from "./NFTCard";

const NFTHUB_ADDRESS = "0x5125eb82fb3E719978599034d962A17D4e87C5D5";

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
