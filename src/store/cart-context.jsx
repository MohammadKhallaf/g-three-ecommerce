import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

//  NEW --> MOVE THE CONTEXT HERE
export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const useCart = () => useContext(CartContext);

//
function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // sync only
    const cartInLocal = localStorage.getItem("cart");
    const cartInJS = JSON.parse(cartInLocal);
    // if (cartInJS) return cartInJS;
    // else return [];
    return cartInJS ?? [];
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const newArr = [...prevCart];

      const idx = newArr.findIndex((item) => {
        return item.id === product.id;
      });

      if (idx === -1) {
        const newProduct = {
          ...product,
          qty: 1,
        };
        return [...newArr, newProduct];
      } else {
        newArr[idx].qty += 1;
        return [...newArr];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart((prevArr) => {
      const newArr = prevArr.filter((item) => item.id !== product.id);
      return newArr;
    });
  };

  useEffect(() => {
    const stringCartArray = JSON.stringify(cart);
    localStorage.setItem("cart", stringCartArray);
    toast.success("Cart and local storage Updated");
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
