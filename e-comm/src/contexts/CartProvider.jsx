import { createContext, useContext, useState, useEffect } from "react";

// Create a new Context
const CartContext = createContext();

// CartProvider component
function CartProvider({ children }) {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("storedCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("storedCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}  
    </CartContext.Provider>
  );  
}

// Custom hook for using cart context
export function useCart() {
  return useContext(CartContext);
}

export default CartProvider;
