import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { CartContext, WishlistContext } from "../App";
import { Stack } from "react-bootstrap";
function ProductCard({ product }) {
  const { cart, addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const idx = wishlist.findIndex((item) => item.id === product.id);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="https://placehold.co/600x400" />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.description} -<b>{product.price} EGP</b>
        </Card.Text>
        <Stack direction="vertical" gap={3}>
          <Button
            variant="primary"
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to cart
          </Button>
          {idx === -1 ? (
            <Button
              variant="warning"
              onClick={() => {
                addToWishlist(product);
              }}
            >
              Add to wishlist
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={() => {
                removeFromWishlist(product);
              }}
            >
              Remove from wishlist
            </Button>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
export default ProductCard;
