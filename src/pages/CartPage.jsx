import { useMemo, useState } from "react";
import { Button, Card, Container, Stack } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useCart } from "../store/cart-context";
import toast from "react-hot-toast";
import { useAuth } from "../store/auth-context";

function CartPage() {
  const { cart, removeFromCart } = useCart();
  const { user, login, logout } = useAuth();
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "Cash", value: "1" },
    { name: "Credit", value: "2" },
    { name: "Wallet", value: "3" },
  ];
  // product name - price - image - qty
  // sum
  const sum = useMemo(() => {
    return cart.reduce((prev, current) => {
      return prev + +current.price;
    }, 0);
  }, [cart]);

  return (
    <Container className="py-5">
      <Stack direction="horizontal" gap={3}>
        <Card className="py-5 px-3">
          <Card.Header>Payment Method</Card.Header>
          <Card.Body>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-success" : "outline-danger"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Card.Body>
        </Card>
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
      </Stack>
      <hr />
      <Card className="py-1 fw-bolder">{sum.toFixed(2)} EGP</Card>
      {user?._id ? (
        <Button
          className="w-100 mt-4"
          variant="success"
          disabled={!cart.length}
          onClick={() => toast.success("Cart Checkout Done!")}
        >
          Checkout
        </Button>
      ) : null}

      {/* <Button
        className="w-100 mt-4"
        variant="danger"
        disabled={!cart.length}
        onClick={() => login()}
      >
        Login
      </Button>
      <Button
        className="w-100 mt-4"
        variant="danger"
        disabled={!cart.length}
        onClick={() => logout()}
      >
        Logout
      </Button> */}
    </Container>
  );
}

export default CartPage;
