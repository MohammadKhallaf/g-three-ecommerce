import Container from "react-bootstrap/Container";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomNavbar from "./components/CustomNavbar";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ProductsGallery from "./pages/ProductsGallery";
import WishlistPage from "./pages/WishlistPage";
import CartProvider from "./store/cart-context";
import WishlistProvider from "./store/wishlist-context";
import ProductProvider from "./store/product-context";

function App() {
  // lifecycle listen to the changes in the cart
  // 1. prevent writing in initial render
  // 2. in each action (add/remove) -> update local storage
  // 3. useState (()=>{return})

  return (
    <ProductProvider>
      {/* --- */}
      <CartProvider>
        <WishlistProvider>
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
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  );
}
// .Provider

export default App;
