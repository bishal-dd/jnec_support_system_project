import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import AdminNav from "../../AdminNavigationComp/AdminNav";

export default function AssignComp() {
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
      if (response.data === "Assigned") {
        toast.success("Assigned");
      }
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
      const response = await axios.get("http://localhost:3001/api/get_worker");

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
    <div className="container-md mt-5">
      <AdminNav />
      <div className="row">
        <table class="table table-bordered mt-3 shadow">
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
            {event
              .filter((item) => item.status === "assigned")
              .map((item, index) => {
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
                        {worker
                          .filter((ite) => ite.id === item.worker_id)
                          .map((item, index) => {
                            return <option key={index}>{item.username}</option>;
                          })}

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
