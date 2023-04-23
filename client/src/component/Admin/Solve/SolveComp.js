import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import AdminNav from "../AdminNavigationComp/AdminNav";

export default function SolveComp() {
  const [event, setevent] = useState([]);
  const [worker, setWorker] = useState([]);

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
   
    <div className="container-fluid">
      <div className="col">
      <div> <AdminNav /> </div>
        <table class="container table table-bordered mt-3 shadow">
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
              .filter((item) => item.status === "solved")
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
                      {worker
                        .filter((ite) => ite.id === item.worker_id)
                        .map((item, index) => {
                          return <p key={index}>{item.username}</p>;
                        })}
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
