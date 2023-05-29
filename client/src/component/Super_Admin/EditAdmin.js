import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function EditAdmin() {
  const nameRef = useRef("");
  const emailRef = useRef("");
  const navigate = useNavigate();

  const locate = useLocation();
  const admin = locate.state;

  const handleSubmit = async (id, e) => {
    e.preventDefault();

    try {
      await axios
        .put(`${process.env.REACT_APP_URL}/editadmin/${id}`, {
          name: nameRef.current.value,
          email: emailRef.current.value,
        })
        .then((result) => {
          toast.success(result.data);
        });

      navigate(-1);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col mt-5 justify-content-center">
          <div className="row  justify-content-center">
            <div className="col-md-5 shadow">
              <h3 className="text-center">Edit Admin</h3>

              <Form
                onSubmit={(e) => {
                  handleSubmit(admin.id, e);
                }}
              >
                <Form.Group controlId="name">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    defaultValue={admin.username}
                    required
                    ref={nameRef}
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    defaultValue={admin.email}
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
