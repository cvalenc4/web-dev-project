import React from 'react';

// Need to make images be of the same size to align each product
const ProductCard = ({ product }) => {
  return (
    <a href="#" className="group">
      <div
        className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
      >
        <img
          src={product.image}
          alt={product.description}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
    </a>
  );
};

export default ProductCard;
