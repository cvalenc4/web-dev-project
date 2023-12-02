import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar.js';

const Home = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
          <Navbar className="z-50" />
          <div className="flex-grow relative bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url(https://www.corporatevision-news.com/wp-content/uploads/2021/04/ecommerce.jpg)'
 }}>
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-5 rounded-lg">
                <h1 className="text-white text-5xl font-bold mb-4">Welcome to Our Store</h1>
                <p className="text-white text-xl mb-6">Explore our exclusive collection</p>
                <button onClick={() => window.location.href='/shop'} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Home;