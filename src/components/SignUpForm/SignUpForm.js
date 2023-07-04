/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setIsLoggedIn, setIsSignedUp } from "../../features/user";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter proper email id!!!")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password strength should be more than 6")
    .required("Password is required"),
});

function SignUpForm() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleSubmit = async ({ email, password }) => {
    console.log("I am in handle singup function");
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
    console.log(JSON.stringify(user));
  };

  const logInUser = () => {
    dispatch(setIsSignedUp(true));
  };

  return (
    <>
      <h2 className="text-center">Signup</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        validateOnChange
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Field
                type="email"
                name="email"
                as={Form.Control}
                className={formik.errors.email ? "border border-danger" : ""}
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

            <Button variant="primary" type="submit" disabled={!formik.isValid}>
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
        )}
      </Formik>
    </>
  );
}

export default SignUpForm;
