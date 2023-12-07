import { useNavigate } from "react-router-dom";
import NavbarHome from '../Navbar/NavbarHome.js';

const Home = () => {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
          <NavbarHome className="z-50" />
          <div className="flex-grow relative bg-no-repeat bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
 }}>
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-5 rounded-lg">
                <h1 className="text-white text-5xl font-bold mb-4">TechStack</h1>
                <p className="text-white text-xl mb-6">Discover the Latest in Tech and Gadgets</p>
                <button onClick={() => window.location.href='/shop'} className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Home;