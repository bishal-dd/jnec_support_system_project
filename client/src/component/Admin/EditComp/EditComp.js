import React from "react";
import "./editcomp.css";
import { Form, Button } from "react-bootstrap";


export default function EditComp() {


  return (
    <div className="container mt-5 bg-light rounded-4 shadow" style={{ maxWidth: "600px" }}>
      <Form className="mt-4">
        <h3 className="text-center">Update Worker Details</h3>
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
        <div className="row justify-content-center text-center gap-5 mt-3">
        <Button className="btn btn-success col-4  text-center  rounded-4 " type="submit">Update</Button>
        <a href="/admin" className="btn btn-success col-4  text-center  rounded-4">Cancel</a>
        
        </div><br></br>
      </Form>
    </div>
  );
}
