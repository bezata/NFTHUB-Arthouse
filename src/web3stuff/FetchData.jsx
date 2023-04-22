import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContractRead } from "wagmi";
import nfthubABI from "./abi/NFTHUB.json"; // Import the ABI for your contract
import NFTCard from "./NFTCard";

const NFTHUB_ADDRESS = "0xcb44fEEcC8cEc04393C92dC3CA6aD1148a2768C1";

const NFTImage = () => {
  const [itemData, setItemData] = useState("");
  const { data: fetchItem } = useContractRead({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "fetchItem",
    args: [1],
  });
  useEffect(() => {
    if (fetchItem) {
      setItemData(fetchItem);
    }
  }, [fetchItem]);

  return (
    <div>
      <NFTCard
        name={itemData[4]}
        description={itemData[5]}
        image={itemData[6]}
        minterAddress="0xAb58...3e74"
      />
    </div>
  );
};

export default NFTImage;
