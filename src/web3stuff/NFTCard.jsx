function NFTCard({ name, description, image, minterAddress }) {
  return (
    <div className="p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="mb-4">
        <img className="rounded-lg" src={image} alt={name} />
      </div>
      <h5 className="mb-2 text-2xl font-bold dark:text-white">{name}</h5>
      <p className="mb-4 text-md font-normal dark:text-gray-400">
        {description}
      </p>
      <div className="flex justify-between items-center">
        <p className="text-md font-light dark:text-gray-400">{minterAddress}</p>
      </div>
    </div>
  );
}
export default NFTCard;
