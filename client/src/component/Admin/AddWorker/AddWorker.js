import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  department: "",
  phone: "",
  email: "",
};

export default function AddWorker() {
  const [state, setState] = useState(initialState);

  const { name, department, phone, email } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (setState(initialState)) {
      toast.error("please enter correct values");
    } else {
      axios
        .post("http://localhost:3001/api/add_worker", {
          name,
          department,
          phone,
          email,
        })
        .then((response) =>
          toast.response(response.data)
        )
        .catch((error) => toast.error(error.response.data));
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
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
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="department">
          <Form.Label>Department:</Form.Label>
          <Form.Control
            as="select"
            name="department"
            required
            value={department}
            onChange={handleInputChange}
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
            type="number"
            name="phone"
            required
            value={phone}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            required
            value={email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button type="submit">Add Worker</Button>
      </Form>
    </div>
  );
}
