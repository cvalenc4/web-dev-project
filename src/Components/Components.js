import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListing from './ProductListing/ProductListing.js';
import About from './About/About.js';

export default function Components() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductListing />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    )
}