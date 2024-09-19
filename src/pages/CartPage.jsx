import { Button, Card, Container, Stack } from "react-bootstrap";
import { useCart } from "../store/cart-context";

function CartPage() {
  const { cart, removeFromCart } = useCart();

  // product name - price - image - qty
  // sum
  const sum = cart.reduce((prev, current) => {
    return prev + +current.price;
  }, 0);

  return (
    <Container className="py-5">
      <Stack gap={3}>
        {cart.map((product) => {
          return (
            <Card key={product.id}>
              <Stack
                direction="horizontal"
                className="justify-content-between px-3"
              >
                <p>
                  {product.title} - x{product.qty}
                </p>

                <p>{product.price}EGP</p>
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(product)}
                >
                  Remove
                </Button>
              </Stack>
            </Card>
          );
        })}
      </Stack>
      <hr />
      <b>{sum} EGP</b>
    </Container>
  );
}

export default CartPage;
