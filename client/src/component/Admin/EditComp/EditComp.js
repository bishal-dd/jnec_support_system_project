import React, { useRef, useContext } from "react";
import "./editcomp.css";
import { Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AdminNav from "../AdminNavigationComp/AdminNav";
import { AuthContext } from "../../../context/AuthContext";

export default function EditComp() {
  const { currentUser } = useContext(AuthContext);
  const nameRef = useRef("");
  const phoneRef = useRef("");
  const emailRef = useRef("");

  const locate = useLocation();
  const worker = locate.state;

  const handleSubmit = (id, e) => {
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_URL}/editworker/${id}`, {
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        department: currentUser.department,
      })
      .then((result) => {
        toast.success(result.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col mt-5 justify-content-center">
          <div className="row  justify-content-center">
            <div className="col-md-5 shadow">
              <h3 className="text-center">Edit Staff</h3>

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
                    className="btn btn-success col-6  text-center  rounded-3 "
                    type="submit"
                  >
                    Update
                  </Button>
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
