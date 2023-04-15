import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function AdminHome() {
  const [event, setevent] = useState([]);
  const [worker, setWorker] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);

  const assignWorker = async (workerId, issueId) => {
    console.log(workerId);
    try {
      const response = await axios.put(
        `http://localhost:3001/api/assign_issue/${issueId}`,
        { id: issueId, worker_id: workerId }
      );
      console.log(response.data);
      // Refresh the event list to show the updated worker assignment
      loadEvent();
    } catch (error) {
      console.error(error);
    }
  };

  const loadEvent = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/get_issue");

      setevent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadWorker = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/get_addworker"
      );
      console.log(response.data);
      setWorker(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEvent();
    loadWorker();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col text-center">
          <Link to="/add" className="btn btn-primary">
            Addworker
          </Link>
        </div>
        <div className="col">
          <Link to="/edit" className="btn btn-primary">
            Editworker
          </Link>
        </div>
        <div className="col">
          <Link to="/delete" className="btn btn-primary">
            Deleteworker
          </Link>
        </div>
      </div>
      <div className="row">
        <table class="table table-bordered mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Issue</th>
              <th scope="col">Issue_image</th>
              <th scope="col">Issue_summary</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {event.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td className="col w-50 p-3 text-center">
                    <img
                      src={item.issue_image}
                      alt="issue_image"
                      height="200px"
                    />
                  </td>

                  <td>{item.issue_summary}</td>
                  <th>
                    <select
                      onChange={(e) => setSelectedWorkerId(e.target.value)}
                    >
                      <option>Select Worker</option>
                      {worker.map((item, index) => {
                        return (
                          <option key={index} value={item.id}>
                            {item.username}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      className="btn btn-primary"
                      onClick={() => assignWorker(selectedWorkerId, item.id)}
                    >
                      Assign
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
