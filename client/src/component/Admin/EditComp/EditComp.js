import React from "react";
import "./editcomp.css";
import { Form, Button } from "react-bootstrap";


export default function EditComp() {


  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            required
          />
        </Form.Group>

        <Form.Group controlId="department">
          <Form.Label>Department:</Form.Label>
          <Form.Control  
            as="select"
            name="department"
            required>
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
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
          />
        </Form.Group>

        <Button type="submit">Edit Worker</Button>
      </Form>
    </div>
  );
}
