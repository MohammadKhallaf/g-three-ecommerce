import { createContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ProductsGallery from "./pages/ProductsGallery";
import WishlistPage from "./pages/WishlistPage";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

export const CartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

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
  // lifecycle listen to the changes in the cart
  useEffect(() => {
    toast("Hello World");
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      <div className="App">
        <CustomNavbar />

        <Routes>
          <Route path="/" element={<ProductsGallery />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<Container>Not Found</Container>} />
        </Routes>
        <Toaster />
      </div>
    </CartContext.Provider>
  );
}
// .Provider

export default App;
