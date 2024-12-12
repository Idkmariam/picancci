import React, { createContext, useState, useContext } from 'react';

// Create CartContext
const CartContext = createContext();

// Custom hook to access CartContext
export const useCart = () => {
  return useContext(CartContext);
};

const CartProvider = ({ children }) => {
  // Initialize cartItems from localStorage (or default to an empty array if nothing is stored)
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Function to add an item to the cart
  const addItemToCart = (item) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    // Clear the cart from localStorage
    localStorage.removeItem('cartItems');
  };

  // Return the provider with context values
  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
