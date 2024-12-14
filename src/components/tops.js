import React, { useState,useEffect } from "react";
import './category.css';
import Navbar from "./navbar";
import Footer from './footer';
import { useCart } from './CartContext';




const Tops = () => {
    const [tops, setTops] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const { addItemToCart } = useCart();
     const [clickedItem, setClickedItem] = useState(null);
    
    
    useEffect(() => {
        fetch("/products.json")
          .then((response) => response.json())
          .then((data) => {
            setTops(data.tops);
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

    const filteredTops = tops.filter((top) =>
        top.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      const handleItemClick = (item) => {
        // If the clicked item is already selected, toggle its visibility off
        if (clickedItem && clickedItem.id === item.id) {
            setClickedItem(null); // Deselect the item
        } else {
            setClickedItem(item); // Select the clicked item
        }
    };

    return (
        <div className="category-container">
            {/* Navbar */}
            <Navbar 
                toggleSidebar={toggleSidebar} 
                searchQuery={searchQuery} 
                handleSearch={(e) => setSearchQuery(e.target.value)} 
            />


           

            {/* Page Title and Description */}
            <h1>Outerwear and Tops</h1>
            <p>Explore our collection of outerwear and tops designed for every season.</p>

            {/* Product Listing on the Main Screen */}
            <div className="our-products">
                <div className="items">
                    {filteredTops.map((product) => (
                        <div key={product.id} className="itemm" onClick={() => handleItemClick(product)}>
                            <img src={product.image} alt={product.name} className="item-image" />
                            <div className="cont">
                                <p className="item-name">{product.name}</p>
                                <p className="item-price">{product.price}</p>
                                <button className="add-to-cart-btn" onClick={() => addItemToCart(product)}>Add to Cart</button>
                            </div>
                            {clickedItem && clickedItem.id === product.id && (
                                <p className="item-description">{product.description}</p>
                            )}
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

export default Tops;
