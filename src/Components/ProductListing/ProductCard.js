import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-300 shadow-lg rounded-lg overflow-hidden flex flex-col relative bg-white">
      <div className="flex justify-center items-center h-64">
        <img
          src={product.get("image")}
          alt={product.get("name")}
          className="max-h-full max-w-full object-contain bg-white" // Ensuring white background for images
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.get("name")}</h3>
        </div>
        <p className="text-gray-600 self-start mt-2">{product.get("actual_price")}</p>
      </div>
      <button className="absolute bottom-2 right-2 bg-blue-500 text-white text-sm px-3 py-2 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
