import React, { useEffect } from "react";
import "./checkcomp.css";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import "./checkcomp.css";

export default function CheckComp() {
  const [id, setId] = useState("");
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

  const matchingEvents = event.filter((event) => event.id === Number(id));

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/get_issue`
        );
        setevent(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="row mt-5">
        <div className="col mt-5 rounded-2" id="check-status">
          <Form className="text-center mt-5" onSubmit={handleSubmit}>
            <h3 className="text-center">Check Status</h3>
            <Form.Group controlId="name">
              <Form.Label className="text-center">Issue_ID</Form.Label>
              <Form.Control
                type="number"
                name="id"
                required
                value={id}
                onChange={(event) => setId(event.target.value)}
              />
            </Form.Group>
            <div className="row justify-content-center text-center mt-3">
              <div className="col-5">
                <Button className="btn btn-success rounded-2" type="submit">
                  Check
                </Button>
              </div>
              <div className="col-5">
                <Button
                  type="reset"
                  className="btn btn-success rounded-2"
                  onClick={() => setId("")}
                >
                  Clear
                </Button>
              </div>
            </div>
            <br />
          </Form>
          {id !== "" && matchingEvents.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Issue Summary</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {matchingEvents.map((event, index) => (
                  <tr key={index}>
                    <td>{event.issue_summary}</td>
                    <td>
                      {event.status === "solved"
                        ? "This issue was solved"
                        : event.status === "working"
                        ? "This issue is being worked on"
                        : event.status === "assigned"
                        ? "This issue was assigned"
                        : "This issue is not yet assigned"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          {id !== "" && matchingEvents.length === 0 ? (
            <b>There are no issues that match</b>
          ) : null}
        </div>
      </div>
    </div>
  );
}
