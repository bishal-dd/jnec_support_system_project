import React from "react";
import "./checkcomp.css";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

export default function CheckComp() {
  const [Email, setEmail] = useState("");
  const [event, setevent] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/get_issue`
      );

      setevent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const matchingEvents = event.filter((event) => event.email === Email);

  return (
    <div
      className="container mt-5 bg-light rounded-4 shadow"
      style={{ maxWidth: "500px" }}
    >
      <div className="row">
        <div className="col">
          <Form className="text-center mt-5" onSubmit={handleSubmit}>
            <h3 className="text-center">Check Status</h3>
            <Form.Group controlId="name">
              <Form.Label className="text-center">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                required
                value={Email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <div className="row justify-content-center text-center mt-3">
              <div className="col-5">
                <Button className="btn btn-success rounded-4" type="submit">
                  Check
                </Button>
              </div>
              <div className="col-5">
                <Button
                  type="reset"
                  className="btn btn-success rounded-4"
                  onClick={() => setEmail("")}
                >
                  Reset
                </Button>
              </div>
            </div>
            <br />
          </Form>
          {matchingEvents.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>

                  <th>Email</th>
                  <th>Issue Summary</th>
                </tr>
              </thead>
              <tbody>
                {matchingEvents.map((event, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>

                    <td>{event.email}</td>
                    <td>{event.issue_summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <b>There are no issues that match your email</b>
          )}
        </div>
      </div>
    </div>
  );
}
