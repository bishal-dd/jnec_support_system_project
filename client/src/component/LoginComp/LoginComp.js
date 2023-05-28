import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Container, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function LoginComp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/login`, {
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
        window.location.reload();
      } else if (decodeToken(token).role === "super_admin") {
        navigate("/super_admin");
        window.location.reload();
      } else {
        navigate("/view");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <Container className="d-grid w-80   p-4 mt-3" style={{ maxWidth: "540px" }}>
      <div className="row mt-5">
        <div className="col mt-5 rounded-4 border shadow">
          <Form
            id="sign-in-form"
            className="text-center w-100 align-item-center justify-content-center"
            onSubmit={handleSubmit}
          >
            <i className="fa fa-user-circle fa-5x mb-3" aria-hidden="true"></i>
            <IoPersonCircleSharp size={100} />
            <Form.Group className="mb-3" controlId="name">
              <Form.Control
                className="position-relative"
                type="name"
                placeholder="Email"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
              />
            </Form.Group>
            <br />
            <Form.Group className="mb-3" controlId="password">
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
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
            <br />
          </Form>
        </div>
      </div>
    </Container>
  );
}
