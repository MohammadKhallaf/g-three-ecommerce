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
export const WishlistContext = createContext({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
});

function App() {
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

  const [wishlist, setWishlist] = useState(() => {
    // sync only
    const wishlistInLocal = localStorage.getItem("wishlist");
    const wishlistInJS = JSON.parse(wishlistInLocal);
    // if (wishlistInJS) return wishlistInJS;
    // else return [];
    return wishlistInJS ?? [];
  });

  const addToWishlist = (product) => {
    setWishlist((prevArr) => {
      const newArr = [...prevArr];

      const idx = newArr.findIndex((item) => {
        return item.id === product.id;
      });

      if (idx === -1) {
        // not exist

        return [...newArr, product];
      } else {
        // exists
        toast.error("Product is already exists!");
        return [...newArr];
      }
    });
  };

  const removeFromWishlist = (product) => {
    setWishlist((prevArr) => {
      const newArr = prevArr.filter((item) => item.id !== product.id);
      return newArr;
    });
  };

  // lifecycle listen to the changes in the cart
  // 1. prevent writing in initial render
  // 2. in each action (add/remove) -> update local storage
  // 3. useState (()=>{return})
  useEffect(() => {
    const stringCartArray = JSON.stringify(cart);
    localStorage.setItem("cart", stringCartArray);
    toast.success("Cart and local storage Updated");
  }, [cart]);
  useEffect(() => {
    const stringWishlistArray = JSON.stringify(wishlist);
    localStorage.setItem("wishlist", stringWishlistArray);
    toast.success("wishlist and local storage Updated");
  }, [wishlist]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      <WishlistContext.Provider
        value={{ wishlist, addToWishlist, removeFromWishlist }}
      >
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
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
}
// .Provider

export default App;
