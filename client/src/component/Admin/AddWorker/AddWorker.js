import axios from "axios";
import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import AdminNav from "../AdminNavigationComp/AdminNav";
import "./addworker.css";
import { AuthContext } from "../../../context/AuthContext";

const initialState = {
  name: "",
  phone: "",
  email: "",
};

export default function AddWorker({ serverUrl }) {
  const { currentUser } = useContext(AuthContext);
  const [state, setState] = useState(initialState);
  const department = currentUser.department;
  const { name, phone, email } = state;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (setState(initialState)) {
      toast.error("please enter correct values");
    } else {
      axios
        .post(`${serverUrl}/worker`, {
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
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col mt-5">
          <div className="row justify-content-center">
            <div className="col-md-5 ">
              {" "}
              <Form className="justify-content-center" onSubmit={handleSubmit}>
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
                    Add
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
      </div>
    </div>
  );
}
