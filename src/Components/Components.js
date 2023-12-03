import { Navigate, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListing from './ProductListing/ProductListing.js';
import About from './About/About.js';
import AuthRegister from '../Common/Services/Auth/AuthRegister.js';
import AuthLogin from '../Common/Services/Auth/AuthLogin.js';
import { getCurrentUser } from '../Common/Services/Auth/AuthService.js';
import ProtectedRoute from "../Common/Services/ProtectedRoute.js";
import Home from './Home/Home.js';

// Currently only have 2 pages, and would like to add more in the future
export default function Components() { 
    const user = getCurrentUser();
    // <Route path="/" element={<ProductListing />} />

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/auth/login" element={user ? <Navigate to="/" /> : <AuthLogin />} />
                <Route path="/auth/register" element={user ? <Navigate to="/auth/login" /> : <AuthRegister />} />
                <Route path="*" element={<Navigate to="/auth/login" replace />} />
                <Route 
                    path="/shop"
                    element={
                        <ProtectedRoute>
                            <ProductListing />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}