import React from "react";

function NFTCard({ name, description, image, minterAddress }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-64">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-300 to-blue-400 opacity-25"></div>
      </div>
      <div className="px-6 py-4">
        <div className="border-b border-gray-600 mb-4 pb-4">
          <h2 className="text-2xl font-bold mb-2 text-white">{name}</h2>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-xs text-gray-500">Minted by:</p>
          <p className="text-sm text-white">{minterAddress}</p>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
