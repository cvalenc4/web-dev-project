import React, { useContext, useEffect, useState } from 'react';
import { getAllProducts } from '../../Common/Services/Products.js';
import ProductCard from './ProductCard.js';
import Navbar from '../Navbar/Navbar.js';
import { SearchContext } from '../../SearchContext.js';

// Currently clicking on pictures keeps you on this page. In future, we want to redirect to a more detailed product card

// We are wanting to edit the style in the future

const ProductListing = () => {

  const { searchQuery } = useContext(SearchContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if ( searchQuery ) {
        // filter products based on search query
        const filteredProducts = await getAllProducts(searchQuery.toLowerCase());
        setProducts(filteredProducts);
      } else {
        // show all products 
        const allProducts = await getAllProducts('');
        setProducts(allProducts);
      }
    };
    fetchProducts();
    
  }, [searchQuery]);
  
  return (
    <div>
      <Navbar />
      <div className="bg-gray-100">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
