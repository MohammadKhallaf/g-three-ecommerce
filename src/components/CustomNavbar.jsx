import { useContext } from "react";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartContext, WishlistContext } from "../App";

const CustomNavbar = () => {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  return (
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
            Wishlist{" "}
            <Badge bg="warning" text="dark">
              {wishlist.length}
            </Badge>
          </Nav.Link>
          <Nav.Link as={Link} to="cart">
            Cart
            <Badge>{cart.length}</Badge>
          </Nav.Link>

          <Nav.Link as={Link} to="login">
            Login
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
