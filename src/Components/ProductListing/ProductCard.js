import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../../Common/Services/Auth/AuthService';
import { addToCart } from '../../Common/Services/cartServices';
import { getCurrentUser } from '../../Common/Services/Auth/AuthService.js';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    if (!checkUser()) {
      navigate('/auth/login');
    } else {
      console.log('Adding product to cart');
      const user  = getCurrentUser();
      addToCart(user, product, 1)
        .then(() => {
          console.log('Product added to cart');
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 2000);

        })
        .catch(error => {
          console.error('Error adding to cart:', error);
        });
    }
  };

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg overflow-hidden flex flex-col relative bg-white">
      <div className="flex justify-center items-center h-64 p-3">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain bg-white" 
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-md font-semibold text-gray-800">{product.name}</h3>
        </div>
        <p className="self-start mt-5">${product.actual_price}</p>
      </div>
      <button onClick={handleAddToCart} className="absolute bottom-2 right-2 bg-gray-600 text-white text-sm px-3 py-2 rounded hover:bg-gray-800">
        Add to Cart
      </button>
      {showNotification && (
        <div className="absolute top-2 right-2 bg-green-500 text-white py-2 px-4 rounded-lg">
          Added to cart!
        </div>
      )}
    </div>
  );
};

export default ProductCard;