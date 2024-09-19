import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Card, Container } from "react-bootstrap";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../store/auth-context";
import axios from "axios";

function LoginPage() {
  const { login } = useAuth();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // update each state with input update

  // submit -> send to BE
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const user = { username, password };
    axios
      .post("http://localhost:5000/api/auth/login", {
        username,
        password,
      })
      .then((response) => {
        toast.success("login success!");
        console.log(response);
        login(response.data.user);
      })
      .catch((err) => {
        toast.error("Unauthorized!");
      });
    // success -> [/]
    // failure -> [X]
    // POST
    // {username, password}
  };
  // GET POST PUT DELETE
  return (
    <Container className="py-5">
      <Card className="p-3 text-start justify-content-start">
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default LoginPage;
