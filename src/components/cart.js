import React from 'react';
import { useCart } from './CartContext';
import Navbar from './navbar';
import './cart.css';

const CartPage = () => {
  const { cartItems, removeItemFromCart, clearCart, updateItemQuantity } = useCart();

  
  const totalPrice = cartItems
    .reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0)
    .toFixed(2);

    const handleCheckout = () => {
      alert('Proceeding to checkout!');
      // Add checkout logic here
    };

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
    <div className="cart-item-quantity">
                    <button
                      className="quantity-button"
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
    <button className="remove-button" onClick={() => removeItemFromCart(item.id)}>Remove</button>
  </li>
))}

          </ul>
        )}
      </div>
      
      {cartItems.length > 0 && (
          <div className="cart-action-bar">
            <p className="total-price">
              <strong>Total price : ${totalPrice}</strong>
            </p>
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
    </div>
    </div>
  );
};

export default CartPage;
