import { createContext, useContext, useState, useEffect } from "react";



const cartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState(
        localStorage.getItem("storedCart") !== null
            ? JSON.parse(localStorage.getItem("storedCart"))
            : []
    );
    // const [cartItems, setCartItems] = useState(
    //     localStorage.getItem("storedCart") !== null
    //         ? JSON.parse(localStorage.getItem("storedCart"))
    //         : []
    // );
    return (
        <cartContext.Provider value={{ cart, setCart }}>
            {children}
        </cartContext.Provider>
    );
}

export function useCart() {
    return useContext(cartContext);
}

export default CartProvider;



// const CartContext = createContext();

// function CartProvider({ children }) {
//   const [cart, setCart] = useState(() => {
//     const storedCart = localStorage.getItem("storedCart");
//     return storedCart ? JSON.parse(storedCart) : [];
//   });

  
//   useEffect(() => {
//     localStorage.setItem("storedCart", JSON.stringify(cart));
//   }, [cart]);

//   return (
//     <CartContext.Provider value={{ cart, setCart }}>
//       {children}  
//     </CartContext.Provider>
//   );  
// }


// export function useCart() {
//   return useContext(CartContext);
// }

// export default CartProvider;
