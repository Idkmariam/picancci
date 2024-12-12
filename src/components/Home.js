import React, { useState,useEffect,  useRef } from "react";
import { useCart } from './CartContext';

import "./Home.css";
import Navbar from "./navbar";

import { useNavigate } from "react-router-dom";
import Footer from "./footer";

const Image = "/assets/img1.png";
const POSTER = "/assets/poster.jpg";




const Home = () => {

  const [products, setProducts] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { addItemToCart } = useCart();
  const [loading, setLoading] = useState(true);

  const productsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.items);
        setBestSelling(data.bestSelling);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
    setIsSidebarOpen(false); // Close sidebar after navigation
  };

  
  
  
    // Filter products and bestSelling by name
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredBestSelling = bestSelling.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    
  
  

  


  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" }); 
  };

  <Navbar 
  toggleSidebar={toggleSidebar} 
  searchQuery={searchQuery} 
  handleSearch={(e) => setSearchQuery(e.target.value)} 
/>


  return (
    <div className="home-container">
        <Navbar 
                toggleSidebar={toggleSidebar} 
                searchQuery={searchQuery} 
                handleSearch={(e) => setSearchQuery(e.target.value)} 
            />
      {/* Top Container */}
      <div className="top-container">
    


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
        {/* Additional Content */}
        <div className="additional-content">
          <div className="image-container">
            <img src={Image} alt="" className="right-image" />
          </div>
          <div className="text-container">
            <p className="left-text">Discover and Find Your Own Fashion!</p>
            <p className="additional-text">Explore our curated collection of stylish clothing and accessories tailored to your unique taste.</p>
            <button className="explore-button" onClick={scrollToProducts}>Explore Now</button>
          
          </div>
        </div>
      </div>

       {/* Sidebar */}
       <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">Our Category</div>
        <ul className="sidebar-items">
          <li
            className="sidebar-item"
            onClick={() => handleNavigation("/outerwear")}
          >
            Outerwear and Tops
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleNavigation("/pants")}
          >
            Pants
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleNavigation("/skirts")}
          >
            Skirts
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleNavigation("/shoes")}
          >
            Shoes
          </li>
          <li
            className="sidebar-item"
            onClick={() => handleNavigation("/bags")}
          >
            Bags
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
      <div className="best-selling-section">
        <p className="best-selling">Best Selling</p>
        <p className="text">Get in on the trend with our curated selection of best-selling styles.</p>

        {/* Items Section */}
        <div className="items-container">
        {filteredBestSelling.map((bestSelling) => (
    <div key={bestSelling.id} className="item">
      <img src={bestSelling.image} alt={bestSelling.name} className="item-image" />
      <p className="item-name">{bestSelling.name}</p>
      <p className="item-price">{bestSelling.price}</p>
      <button className="add-to-cart-btn"  onClick={() => addItemToCart(bestSelling)}>Add to Cart</button>
    </div>
  ))}
         
        </div>
        </div>
        <div className="poster-section">
           <img src={POSTER} alt="Poster" className="poster-image" />
        </div>
        <div  ref={productsRef} className="our-products-section">
        <p className="best-selling">Our Products</p>

        <div className="items-container-our-products">
        {filteredProducts.map((product) => (
    <div key={product.id} className="item">
      <img src={product.image} alt={product.name} className="item-image" />
      <p className="item-name">{product.name}</p>
      <p className="item-price">{product.price}</p>
      <button className="add-to-cart-btn" onClick={() => addItemToCart(product)}>Add to Cart</button>
    </div>
  ))}
        </div>
        
        {/* About Us Section */}
<Footer/>

        </div>
      </div>
    </div>
  );
};

export default Home;
