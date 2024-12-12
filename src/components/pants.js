import React, { useState,useEffect } from "react";
import './category.css';
import Navbar from "./navbar";
import Footer from './footer';
import { useCart } from './CartContext';



const Pants = () => {
    const [pants, setPants] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const { addItemToCart } = useCart();
    
 useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        setPants(data.pants);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;}

    // Function to toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const filteredPants = pants.filter((pants) =>
        pants.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return (
        <div className="category-container">
            {/* Navbar */}
            <Navbar 
                toggleSidebar={toggleSidebar} 
                searchQuery={searchQuery} 
                handleSearch={(e) => setSearchQuery(e.target.value)} 
            />


            {/* Optional: Sidebar for categories */}
            {isSidebarOpen && (
                <div className="sidebar">
                    <h2>Our Category</h2>
                    <ul>
                        <li><a href="/outerwear">Outerwear</a></li>
                        <li><a href="/pants">Pants</a></li>
                        <li><a href="/skirts">Skirts</a></li>
                        <li><a href="/shoes">Shoes</a></li>
                        <li><a href="/bags">Bags</a></li>
                    </ul>
                </div>
            )}

            {/* Page Title and Description */}
            <h1>Pants</h1>
            <p>Explore our collection of pants designed for every season.</p>

            {/* Product Listing on the Main Screen */}
            <div className="our-products">
                <div className="items">
                    {filteredPants.map((product) => (
                        <div key={product.id} className="itemm">
                            <img src={product.image} alt={product.name} className="item-image" />
                            <div className="cont">
                                <p className="item-name">{product.name}</p>
                                <p className="item-price">{product.price}</p>
                                <button className="add-to-cart-btn" onClick={() => addItemToCart(product)}>Add to Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="foot">
            <Footer />
            </div>
           
        </div>
    );
};

export default Pants;
