import React from 'react';
import { useCart } from './CartContext';
import Navbar from './navbar';
import './cart.css';

const CartPage = () => {
  const { cartItems, removeItemFromCart, clearCart } = useCart();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price.replace('$', '')), 0).toFixed(2);

  return (
    
    <div className="cart-page">
      <Navbar />
      <div className="cart">
      <div className="cart-items-container">
        {cartItems.length === 0 ? (
          <p style={{fontSize: "30px", margin:"20%", fontWeight: "bold"}}>Your cart is empty</p>
        ) : (
          <ul className="cart-items-list">
           {cartItems.map((item) => (
  <li key={item.id} className="cart-item">
    <img src={item.image} alt={item.name} className="cart-item-image" />
    <div className="cart-item-text">
      <h3>{item.name}</h3>
      <p>{item.price}</p>
    </div>
    <button className="remove-button" onClick={() => removeItemFromCart(item.id)}>Remove</button>
  </li>
))}

          </ul>
        )}
      </div>
      
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <p><strong>Total Price: ${totalPrice}</strong></p>
          <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default CartPage;
