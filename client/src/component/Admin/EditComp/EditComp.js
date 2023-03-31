import React, { useState } from "react";
import "./editcomp.css";
import { Form, Button } from "react-bootstrap";

export default function EditComp() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the form data to the backend for processing
    console.log({ name, department, phone, email });
  };

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="department">
          <Form.Label>Department:</Form.Label>
          <Form.Control
            as="select"
            name="department"
            required
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="">Select a department...</option>
            <option value="ICT">ICT</option>
            <option value="estate">Estate</option>
            <option value="eletrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Button type="submit">Edit Worker</Button>
      </Form>
    </div>
  );
}
