import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";

import "./logincomp.css";

export default function LoginComp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });
      const { token } = response.data;

      // Set the JWT token in local storage
      localStorage.setItem("token", token);

      // Navigate to the appropriate page based on the user's role
      if (decodeToken(token).role === "admin") {
        navigate("/admin");
        window.location.reload();
      } else if (decodeToken(token).role === "worker") {
        navigate("/worker");
      }
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <Container
      id="main-container"
      className="d-grid bg-light rounded-4 p-4"
      style={{ maxWidth: "600px" }}
    >
      <Form id="sign-in-form" className="text-center w-100 mt-2 ">
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
          <Button variant="primary" onClick={handleSubmit}>
            login
          </Button>
        </div>
        <br />
      </Form>
    </Container>
  );
}
