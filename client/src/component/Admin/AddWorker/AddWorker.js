import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import AdminNav from "../AdminNavigationComp/AdminNav";


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
      console.log(name);
      axios
        .post("http://localhost:3001/api/worker", {
          name,
          department,
          phone,
          email,
        })

        .then((response) => toast.success(response.data))

        .catch((error) => toast.error(error.response.data));
    }
    console.log(state, name);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="container-fluid">
      <div class="row flex">
      <div><AdminNav /></div>
      <div
        className="container bg-light rounded-4 shadow mt-5"
        style={{ maxWidth: "540px" }}
      >
        <Form className="" onSubmit={handleSubmit}>
          <h3 className="text-center">Add Worker</h3>
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
              <option value="academic">Academic</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              pattern="[0-9]{8}"
              required
              value={phone}
              onChange={handleInputChange}
            />
          </Form.Group>
        
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              value={email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="row justify-content-center text-center gap-5">
            <Button
              className="btn btn-success col-4 
         text-center  rounded-4 "
              type="submit"
            >
              Add Worker
            </Button>
            <a
              href="/admin"
              className="btn btn-success col-4 
         text-center  rounded-4"
            >
              Cancel
            </a>
          </div>
        </Form>
      </div> 
    </div>
    </div>
  );
}
