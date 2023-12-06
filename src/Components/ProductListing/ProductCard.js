import React from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../../Common/Services/Auth/AuthService';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (!checkUser()) {
      navigate('/auth/login');
    } else {
      // Logic to add the product to the cart
    }
  };

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg overflow-hidden flex flex-col relative bg-white">
      <div className="flex justify-center items-center h-64">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain bg-white" 
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        </div>
        <p className="text-gray-600 self-start mt-2">{product.actual_price}</p>
      </div>
      <button onClick={handleAddToCart} className="absolute bottom-2 right-2 bg-blue-500 text-white text-sm px-3 py-2 rounded hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;