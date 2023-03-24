import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./logincomp.css";

export default function LoginComp() {
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState("initialValues");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event) => {
    console.log(event.target);
    // const { name, value} = event.target;
    setFormValues(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormErrors(Validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const Validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "username is required!";
    }
    if (!values.password) {
      errors.password = "password is required!";
    }
    return errors;
  };
  return (
    <Container id="main-container" className="d-grid bg-light rounded-4 p-4">
      <Form id="sign-in-form" className="text-center w-100 mt-2 ">
        <i class="fa fa-user-circle fa-5x mb-3" aria-hidden="true"></i>
        <Form.Group controlId="sign-in-email-address">
          <Form.Control
            class="form.control"
            type="email"
            placeholder="Email address"
            autoComplete="username"
            className="position-relative"
          />
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="sign-in-password">
          <Form.Control
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="position-relative"
          />
        </Form.Group>
        <Form.Group className="d-flex mb-3 p-2  " controlId="remember-me">
          <Form.Check label="Remember me" />
          <a className="link p-2 text-right" href="#">
            Forgot Password?
          </a>
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary">login</Button>
        </div>
        <br />
      </Form>
      <a className="text-left p-2" href="/register">
        Register
      </a>
    </Container>
  );
}
