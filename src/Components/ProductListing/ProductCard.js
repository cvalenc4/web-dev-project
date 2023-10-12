import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <a href="#" className="group"> {/* Thinking about making indivdual cards that will be linked to */}
      <div
        className="w-64 h-64 overflow-hidden rounded-lg"
      >
        <img
          src={product.get("image")}
          alt={product.get("name")}
          className="w-full h-full object-contain mx-auto group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.get("name")}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${}</p>
    </a>
  );
};

export default ProductCard;
