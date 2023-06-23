import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";

import SignUpForm from "../SignUpForm/SignUpForm";
import "./LoginForm.css";
import {
  setEmail,
  setPassword,
  setIsLoggedIn,
  setIsSignedUp,
} from "../../features/user";

function LoginForm() {
  const dispatch = useDispatch();
  const { email, password, isSignedUp } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8080/users/login",
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
    dispatch(setIsLoggedIn(true));
  };

  const signUpUser = (e) => {
    e.preventDefault();
    dispatch(setIsSignedUp(false));
  };

  return (
    <div>
      {isSignedUp ? (
        <Container className="w-50">
          <h1 className="text-center">Login</h1>
          <Form onSubmit={handleLogin}>
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
              Login
            </Button>
            <p>
              If you haven&apos;t created an account, please&nbsp;
              <Button
                variant="link"
                onClick={signUpUser}
                className="text-decoration-underline p-0"
              >
                signup
              </Button>
              .
            </p>
          </Form>
        </Container>
      ) : (
        <SignUpForm />
      )}
    </div>
  );
}

export default LoginForm;
