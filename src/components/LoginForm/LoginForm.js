/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setIsLoggedIn, setIsSignedUp } from "../../features/user";
import "./LoginForm.css";
import SignUpForm from "../SignUpForm/SignUpForm";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter proper email id!!!")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function LoginForm() {
  const isSignedUp = useSelector((state) => state.user.isSignedUp);
  const dispatch = useDispatch();
  const handleLogin = async ({ email, password }) => {
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

  const signUpUser = () => {
    dispatch(setIsSignedUp(false));
  };

  return (
    <Container className="w-50">
      {isSignedUp ? (
        <>
          <h2 className="text-center">Login</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            validateOnChange
            onSubmit={handleLogin}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Field
                    type="email"
                    name="email"
                    as={Form.Control}
                    className={
                      formik.errors.email ? "border border-danger" : ""
                    }
                  />
                  <ErrorMessage
                    name="email"
                    component={Form.Text}
                    className="text-danger"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Field
                    type="text"
                    name="password"
                    as={Form.Control}
                    className={
                      formik.errors.password && formik.touched.title
                        ? "border border-danger"
                        : ""
                    }
                  />
                  <ErrorMessage
                    name="password"
                    component={Form.Text}
                    className="text-danger"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  disabled={!formik.isValid}
                >
                  Login
                </Button>
                <p>
                  If you have created an account, please&nbsp;
                  <Button
                    variant="link"
                    onClick={signUpUser}
                    className="text-decoration-underline p-0"
                  >
                    Sign Up
                  </Button>
                  .
                </p>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <SignUpForm />
      )}
    </Container>
  );
}

export default LoginForm;
