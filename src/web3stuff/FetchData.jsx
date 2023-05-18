import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import nfthubABI from "./abi/NFTHUB.json";
import NFTCard from "./NFTCard";

<<<<<<< Updated upstream
const NFTHUB_ADDRESS = "0xCD387b47A57bb57C99Ef1Aa578019C9253b845eA";
=======
const NFTHUB_ADDRESS = "0x0c5d5A9009E45Ee9eE7e30Dac5257DD836c4a98A";
>>>>>>> Stashed changes

const NFTList = () => {
  const [itemsData, setItemsData] = useState([]);
  const { data: fetchAllItems } = useContractRead({
    address: NFTHUB_ADDRESS,
    abi: nfthubABI,
    functionName: "getAllItems",
  });
<<<<<<< Updated upstream
  useEffect(() => {
    if (fetchAllItems) {
      setItemsData(fetchAllItems);
    }
=======

  useEffect(() => {
    const fetchMetadata = async () => {
      if (fetchAllItems) {
        const metadata = await Promise.all(
          fetchAllItems.map(
            async ({ id, minter, nftAddress, tokenId, tokenURI }) => {
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
            }
          )
        );
        setItemsData(metadata);
      }
    };
    fetchMetadata();
>>>>>>> Stashed changes
  }, [fetchAllItems]);
  return (
    <div className="flex flex-row flex-wrap justify-center">
      {itemsData.map((itemData, index) => (
        <div key={index} className="p-2">
          <NFTCard
<<<<<<< Updated upstream
            name={itemData.name}
            description={itemData.description}
            image={itemData.tokenURI}
            minterAddress={itemData.minter}
=======
            name={itemData.metadata.name}
            description={itemData.metadata.description}
            image={itemData.metadata.image}
            minterAddress={itemData.minterAddress}
>>>>>>> Stashed changes
          />
        </div>
      ))}
    </div>
  );
};

export default NFTList;
