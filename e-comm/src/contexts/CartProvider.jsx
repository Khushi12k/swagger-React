import { createContext, useContext, useReducer } from "react";
const cartContext = createContext();


const localStorageCart = () => {
  const stored = localStorage.getItem("storedCart");
  try {
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState = {
  cart: localStorageCart(),
  cartItems: localStorageCart(),
};

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };

    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.payload };

    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const setCart = (data) =>dispatch({ type: "SET_CART", payload: data });

  const setCartItems = (data) =>dispatch({ type: "SET_CART_ITEMS", payload: data });

  return (
    <cartContext.Provider
      value={{
        cart: state.cart,
        setCart,
        cartItems: state.cartItems,
        setCartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
  return useContext(cartContext);
}

export default CartProvider;















