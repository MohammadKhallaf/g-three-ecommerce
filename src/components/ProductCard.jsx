import { Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useCart } from "../store/cart-context";
import { useWishlist } from "../store/wishlist-context";

function ProductCard({ product }) {
  const { cart, addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const idx = wishlist.findIndex((item) => item.id === product.id);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={product.image} />
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
