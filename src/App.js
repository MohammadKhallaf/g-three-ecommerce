import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import ProductCard from "./components/ProductCard";
import ProductsGallery from "./pages/ProductsGallery";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

function App() {
  // conditional route -> protected --> condition
  const [user, setUser] = useState();
  // if user exists -> login page cannot open
  // if user is not exists -> can open login
  const [cartCounter, setCartCounter] = useState(0);
  const location = useLocation();

  const handleCounter = () => {
    setCartCounter((prev) => {
      localStorage.setItem("counter", prev + 1);
      return prev + 1;
    });
  };
  // listen to local storage
  // save number
  // update
  // read number

  useEffect(() => {
    // initial render
    const counter = localStorage.getItem("counter");
    const counterAsnumber = JSON.parse(counter);

    setCartCounter(counterAsnumber ?? 0);
  }, []);

  return (
    <div className="App">
      {!location.pathname.includes("login") && (
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Amazon
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="wishlist">
                Wishlist
              </Nav.Link>
              <Nav.Link as={Link} to="cart">
                Cart
                <Badge>{cartCounter}</Badge>
              </Nav.Link>
              {user ? null : (
                <Nav.Link as={Link} to="login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Container>
        </Navbar>
      )}

      <Button onClick={handleCounter}>Change the cart number</Button>

      <Routes>
        <Route path="/" element={<ProductsGallery />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        {!user && <Route path="login" element={<LoginPage />} />}
        <Route path="*" element={<Container>Not Found</Container>} />
      </Routes>
    </div>
  );
}
// .Provider

export default App;
