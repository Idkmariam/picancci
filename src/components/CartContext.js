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
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    let updatedCart;
    if (existingItem) {
      // If the item already exists, update its quantity
      updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      // Otherwise, add the new item with a quantity of 1
      updatedCart = [...cartItems, { ...item, quantity: 1 }];
    }

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

  // Function to update the quantity of an item
  const updateItemQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId
        ? { ...item, quantity: Math.max(newQuantity, 1) } // Ensure quantity is at least 1
        : item
    );

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
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
