import React, { useRef } from "react";
import "./editcomp.css";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AdminNav from "../AdminNavigationComp/AdminNav";

export default function EditComp({ serverUrl }) {
  const nameRef = useRef("");
  const departmentRef = useRef("");
  const phoneRef = useRef("");
  const emailRef = useRef("");

  const locate = useLocation();
  const worker = locate.state;

  const handleSubmit = (id, e) => {
    e.preventDefault();

    axios
      .put(`${serverUrl}/editworker/${id}`, {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        department: departmentRef.current.value,
      })
      .then((result) => {
        if (result.data) {
          toast.success("edit success");
        }
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-5 mt-5 justify-content-center">
          <div className="row justify-content-center">
            <div className="col">
              <Form
                onSubmit={(e) => {
                  handleSubmit(worker.id, e);
                }}
              >
                <Form.Group controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
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
                    pattern="[0-9]{8}"
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
                <div className="row justify-content-center text-center gap-5 mt-3">
                  <Button
                    className="btn btn-success col-4  text-center  rounded-4 "
                    type="submit"
                  >
                    Update
                  </Button>
                  <a
                    href="/editworker"
                    className="btn btn-success col-4  text-center  rounded-4"
                  >
                    Cancel
                  </a>
                </div>
                <br></br>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
