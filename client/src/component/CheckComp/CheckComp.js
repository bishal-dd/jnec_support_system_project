import React from "react";
import "./checkcomp.css";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CheckComp({ serverUrl }) {
  const [ticketNumber, setTicketNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`${serverUrl}/check-status/:id`)

      .then((response) => toast.response(response.data))
      .catch((error) => toast.error(error.response.data));
  };
  console.log(ticketNumber);

  return (
    <div
      className="container mt-5 bg-light rounded-4 shadow"
      style={{ maxWidth: "500px" }}
    >
      <Form className="text-center" onSubmit={handleSubmit}>
        <h3 className="text-center">Check Status</h3>
        <Form.Group controlId="name">
          <Form.Label className="text-center">Ticket Number</Form.Label>
          <Form.Control
            type="tickect"
            name="ticket"
            required
            value={ticketNumber}
            onChange={(event) => setTicketNumber(event.target.value)}
          />
        </Form.Group>
        <div className="row justify-content-center text-center gap-5 mt-3">
          <Button
            className="btn btn-success col-4
         text-center  rounded-4 "
            type="submit"
          >
            Check
          </Button>
          <a
            href="/"
            className="btn btn-success col-4 
         text-center  rounded-4"
          >
            Cancel
          </a>
        </div>
        <br></br>
        {status && <p>Status: {status}</p>}
      </Form>
    </div>
  );
}
