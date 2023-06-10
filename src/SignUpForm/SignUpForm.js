import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function SignUpForm(props) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    setIsSignedUp,
    setIsLoggedIn,
  } = props;
  const handleSignup = (e) => {
    e.preventDefault();
    setIsSignedUp(true);
    setIsLoggedIn(true);
    // Perform signup logic with email and password
  };

  const logInUser = (e) => {
    e.preventDefault();
    setIsSignedUp(true);
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

SignUpForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  setIsSignedUp: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};
export default SignUpForm;
