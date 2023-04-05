import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./logincomp.css";

export default function LoginComp() {
  const[username, setUsername] = useState ("");
  const[password, setPassword] = useState ("");
 
  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the form data to the backend for processing
    console.log({ username, password });
  };

  return (
    <Container
      id="main-container"
      className="d-grid bg-light rounded-4 p-4"
      style={{ maxWidth: "600px" }}
    >
      <Form id="sign-in-form" className="text-center w-100 mt-2 " OnSubmit={handleSubmit}>
        <i class="fa fa-user-circle fa-5x mb-3" aria-hidden="true"></i>
        <Form.Group className="mb-3" controlId="name">
          <Form.Control
            class="form.control"
            type="name"
            placeholder="Email address"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            
          />
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="sign-in-password">
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            className="position-relative"
          />
        </Form.Group>
        <div className="d-grid">
          <Button variant="primary">login</Button>
        </div>
        <br />
      </Form>
    </Container>
  );
}
