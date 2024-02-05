// CartContext.js

import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== action.payload),
        };
        case 'UPDATE_QUANTITY':
      const updatedCartItems = state.cartItems.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      return {
        ...state,
        cartItems: updatedCartItems,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

 const addToCart = (item) => {
  // Ensure that 'quantity' is set appropriately, e.g., set to 1 by default
  const itemWithQuantity = { ...item, quantity: item.quantity || 1 };
  dispatch({ type: 'ADD_TO_CART', payload: itemWithQuantity });
};
  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const updateQuantity = (itemId, newQuantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity: newQuantity } });
  };


  return (
    <CartContext.Provider value={{ ...state, addToCart,removeFromCart,updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
