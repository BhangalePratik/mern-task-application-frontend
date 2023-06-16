import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";

import SignUpForm from "../SignUpForm/SignUpForm";
import "./LoginForm.css";

function LoginForm(props) {
  const { email, setEmail, password, setPassword, setIsLoggedIn } = props;
  const [isSignedUp, setIsSignedUp] = useState(true);

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
    setIsLoggedIn(true);
  };

  const signUpUser = (e) => {
    e.preventDefault();
    setIsSignedUp(false);
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
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        <SignUpForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          setIsSignedUp={setIsSignedUp}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </div>
  );
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
