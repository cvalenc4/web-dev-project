import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchActiveCart, removeFromCart, increaseQuantity, decreaseQuantity } from '../../Common/Services/cartServices';
import { getCurrentUser } from '../../Common/Services/Auth/AuthService';
import NavbarHome from '../Navbar/NavbarHome.js';

const CartSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchActiveCart(user).then(cart => {
        setCartItems(cart.get('items') || []);
      });
    }
  }, [user]);

  const handleCheckout = async () => {
    try {
        const response = await fetch('http://localhost:3001/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items: cartItems }),
        });

        const responseBody = await response.text(); // Get response body as text
        console.log(responseBody);
        const data = JSON.parse(responseBody); // Parse the response as JSON
        window.location.href = data.url; // Redirect to Stripe Checkout
    } catch (error) {
        console.error("Error during checkout:", error);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(user, itemId).then(updatedCart => {
      setCartItems(updatedCart.get('items'));
    });
  };

  const handleIncreaseQuantity = (itemId) => {
    increaseQuantity(user, itemId).then(updatedCart => {
        setCartItems(updatedCart.get('items'));
    });
  };
  
  const handleDecreaseQuantity = (itemId) => {
    decreaseQuantity(user, itemId).then(updatedCart => {
        setCartItems(updatedCart.get('items'));
    });
  };

  const priceToNumber = (price) => {
    return parseFloat(price.replace(/[^\d.-]/g, ''));
  }
  
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.get('quantity') * priceToNumber(item.get('product').get('actual_price'));
  }, 0);

  return (
    <div class="bg-gray-100 min-h-screen">
        <NavbarHome />
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/shop')} 
              className="mb-4 inline-flex items-center text-black hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Shop
            </button>
            <div className="flex justify-center">
              <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>
            </div>
          </div>
            {cartItems.map((item, index) => (
                <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow-md mb-3">
                  <img src={item.get('product').get('image')} alt={item.get('product').get('name')} className="w-20 h-20 object-contain mr-4" />
                  <div className="flex-grow">
                      <p className="font-semibold">{item.get('product').get('name')}</p>
                      <div className="flex items-center mt-2">
                      <button onClick={() => handleDecreaseQuantity(item.id)} className="px-2 py-1 border rounded-l-md">
                          -
                      </button>
                      <input type="text" value={item.get('quantity')} readOnly className="w-12 text-center border-t border-b" />
                      <button onClick={() => handleIncreaseQuantity(item.id)} className="px-2 py-1 border rounded-r-md">
                          +
                      </button>
                      </div>
                      <p className="text-right mt-2">Price: ${item.get('quantity') * priceToNumber(item.get('product').get('actual_price'))}</p>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className="ml-4">
                      <img src="https://icons-for-free.com/iconfiles/png/512/trash+bin+icon-1320086460670911435.png" alt="Remove" className="w-6 h-6" />
                  </button>

                </div>
            ))}
            <div className="text-right font-bold mt-4">
              Total Price: ${totalPrice.toFixed(2)}
            </div>
            <button onClick={handleCheckout} className="w-full py-2 px-4 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-800">
              Checkout
            </button>
        </div>
    </div>
  );
};

export default CartSummary;
