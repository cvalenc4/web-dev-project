import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { checkUser, logoutUser } from "../../Common/Services/Auth/AuthService.js";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const test = checkUser();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCartClick = () => {
    if (!checkUser()) {
      navigate('/auth/login');
    } else {
      navigate('/cart');
    }
  };

  const handleAuthAction = () => {
    if (test) {
      logoutUser().then((isLoggedOut) => {
        if (isLoggedOut) {
          navigate('/auth/login');
        }
      });
    } else {
      navigate('/auth/login');
    }
  };

  const handleSignOut = () => {
    logoutUser().then((isLoggedOut) => {
      if (isLoggedOut === false) {
        navigate('/auth/login', { replace: true });
      }
    });
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-8 w-auto" src="/path/to/logo.png" alt="Logo" />
          </div>

          {/* Search Bar */}
          <div className="flex-grow mx-4">
            <form className="flex w-full items-center border rounded-lg overflow-hidden">
              <input type="text" className="flex-grow px-4 py-2" placeholder="Search" aria-label="Search" />
              <button type="submit" className="px-4 bg-blue-500 text-white">
                Search
              </button>
            </form>
          </div>

          {/* Navigation Links and User Profile */}
          <div className="flex items-center space-x-4">
            {/* Navigation Links */}
            <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="/shop" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Shop</a>
            <a href="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>

            {/* Shopping Cart Button */}
            <button
              type="button"
              onClick={handleCartClick}
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white flex items-center justify-center"
            >
              <span className="sr-only">View cart</span>
              {/* Shopping Cart Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>

            {/* User Profile Dropdown - Original */}
            <div className="relative ml-3">
              <div className="ml-2"> {/* Added left margin */}
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User Profile"
                  />
                </button>
              </div>
              {isDropdownOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                >
                  {test ? (
                    <a
                      href="#"
                      onClick={handleAuthAction}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign out
                    </a>
                  ) : (
                    <a
                      href="/auth/login"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign in
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
