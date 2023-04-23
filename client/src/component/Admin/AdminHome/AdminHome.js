import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdminNav from "../AdminNavigationComp/AdminNav";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import ImageModal from "./ImageModule/ImageModal";
import "./adminhome.css";

export default function AdminHome() {
  const { currentUser } = useContext(AuthContext);

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
      console.log(response.data);
      setevent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadWorker = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/get_worker");
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
    
    <div className="container-fluid ">
      <div className="col flex-nowrap ">
       <div><AdminNav /> </div>
       <div className="col d-flex">
        <table className="table table-bordered mt-3 shadow mb-2">
          <thead>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Issue Image</th>
              <th scope="col">Issue Summary</th>
              <th scope="col">Issue Provider</th>
              <th scope="col">Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {event
              .filter(
                (item) =>
                  item.status !== "solved" &&
                  item.status !== "assigned" &&
                  item.issue_type === currentUser.department
              )
              .map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="col-md-3 p-3 text-center">
                      <ImageModal image={item.issue_image} />
                    </td>

                    <td>{item.issue_summary}</td>
                    <td>
                      <p>Name:{item.name}</p>
                      <p>Email:{item.email}</p>
                      <p>Phone No:{item.phone}</p>
                    </td>
                    <td>{item.issue_date}</td>
                    <th>
                      <select className="mb-2 p-2 rounded-2 bg-light"
                        onChange={(e) => setSelectedWorkerId(e.target.value)}
                      >
                        <option>Select Worker</option>
                        {worker
                          .filter(
                            (item) => item.department === currentUser.department
                          )
                          .map((item, index) => {
                            return (
                              <option key={index} value={item.id}>
                                {item.username}
                              </option>
                            );
                          })}
                      </select>
                      <div>
                      <button
                        className="btn btn-info rounded-5 shadow mt-2"
                        onClick={() => assignWorker(selectedWorkerId, item.id)}>
                        Assign
                      </button>
                      </div>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
        </div>
      </div>
      </div>
  );
}
