function NFTCard({ name, description, image, minterAddress }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64">
        <img src={image} alt={name} className="object-cover w-full h-full" />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{name}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between">
          <p className="text-xs text-gray-500">Minted by:</p>
          <p className="text-sm">{minterAddress}</p>
        </div>
      </div>
    </div>
  );
}

export default NFTCard;
