import React, { useContext, useState, useEffect } from "react";
import "./workercomp.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
export default function WorkerComp() {
  const { currentUser } = useContext(AuthContext);
  const [event, setevent] = useState([]);

  const { id } = currentUser;

  const assignSolved = async (workerId, issueId) => {
    console.log(workerId);
    try {
      const response = await axios.put(
        `http://localhost:3001/api/assign_solved/${issueId}`,
        { id: issueId, worker_id: workerId }
      );
      loadEvent();
      toast.success(response.data);

      // Refresh the event list to show the updated worker assignment
    } catch (error) {
      console.error(error);
    }
  };

  const loadEvent = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/get_issue");
      console.log(response.data);
      setevent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEvent();
  }, []);

  return (
    <div id="container" className="">
      <table
        className="table-container text-center
       bg-light"
      >
        <thead className="table-items p-2 text-center">
          <tr>
            <th>SL No:</th>
            <th>Issues</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {event
            .filter(
              (item) => item.worker_id === id && item.status === "assigned"
            )
            .map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <button
                    className="btn btn-primary mb-2 mt-2"
                    onClick={() => assignSolved(item.workerId, item.id)}
                  >
                    Solved
                  </button>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
