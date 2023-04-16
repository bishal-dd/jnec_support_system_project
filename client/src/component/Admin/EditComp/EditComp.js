import React, { useRef, useState } from "react";
import "./editcomp.css";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function EditComp() {
  const nameRef = useRef("");
  const departmentRef = useRef("");
  const phoneRef = useRef("");
  const emailRef = useRef("");

  const locate = useLocation();
  const worker = locate.state;

  const handleSubmit = (id, e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3001/api/editworker/${id}`, {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        department: departmentRef.current.value,
      })
      .then((result) => {
        if (result.data) {
          alert("edit success");
        }
      });
  };

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <Form
        onSubmit={(e) => {
          handleSubmit(worker.id, e);
        }}
      >
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            defaultValue={worker.username}
            required
            ref={nameRef}
          />
        </Form.Group>

        <Form.Group controlId="department">
          <Form.Label>Department:</Form.Label>
          <Form.Control
            as="select"
            name="department"
            required
            defaultValue={worker.department}
            ref={departmentRef}
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
            defaultValue={worker.phone}
            required
            ref={phoneRef}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            defaultValue={worker.email}
            required
            ref={emailRef}
          />
        </Form.Group>

        <Button type="submit">Edit Worker</Button>
      </Form>
    </div>
  );
}
