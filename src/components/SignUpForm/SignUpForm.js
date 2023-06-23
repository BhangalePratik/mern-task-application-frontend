import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";

import {
  setEmail,
  setPassword,
  setIsLoggedIn,
  setIsSignedUp,
} from "../../features/user";

function SignUpForm() {
  const dispatch = useDispatch();
  const { email, password } = useSelector((state) => state.user);
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8080/users/signup",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("jwtToken", response.data);
    dispatch(setIsSignedUp(true));
    dispatch(setIsLoggedIn(true));
  };

  const logInUser = (e) => {
    e.preventDefault();
    dispatch(setIsSignedUp(true));
  };

  return (
    <Container className="w-50">
      <h1 className="text-center">Signup</h1>
      <Form onSubmit={handleSignup}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="my-2">
          Signup
        </Button>
        <p>
          If you have created an account, please&nbsp;
          <Button
            variant="link"
            onClick={logInUser}
            className="text-decoration-underline p-0"
          >
            Login
          </Button>
          .
        </p>
      </Form>
    </Container>
  );
}

export default SignUpForm;
