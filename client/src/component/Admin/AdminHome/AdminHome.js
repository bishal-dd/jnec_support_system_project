import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AdminNav from "../AdminNavigationComp/AdminNav";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthContext";
import ImageModal from "./ImageModule/ImageModal";
import "./adminhome.css";

export default function AdminHome({ serverUrl }) {
  const { currentUser } = useContext(AuthContext);

  const [event, setevent] = useState([]);
  const [worker, setWorker] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [selectedDepartment, setselectedDepartment] = useState("");

  const assignWorker = async (workerId, issueId) => {
    console.log(workerId);
    try {
      const response = await axios.put(`${serverUrl}/assign_issue/${issueId}`, {
        id: issueId,
        worker_id: workerId,
      });
      if (response.data === "Assigned") {
        toast.success("Assigned");
      }
      // Refresh the event list to show the updated worker assignment
      loadEvent();
    } catch (error) {
      console.error(error);
    }
  };

  const assignDepartment = async (Department, issueId) => {
    console.log(Department);
    try {
      const response = await axios.put(`${serverUrl}/foward_issue/${issueId}`, {
        id: issueId,
        department: Department,
      });

      toast.success(response.data);

      // Refresh the event list to show the updated worker assignment
      loadEvent();
    } catch (error) {
      console.error(error);
    }
  };

  const loadEvent = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/get_issue`
      );

      setevent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadWorker = async () => {
    try {
      const response = await axios.get(`${serverUrl}/get_worker`);

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
    <div className="container-fluid custom-container">
      <div className="row">
        <div className="col-lg-2 col-md-3 custom-padding">
          <AdminNav />
        </div>
        <div className="col-lg-10 col-md-9 mt-5">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered shadow mb-2">
              <thead className="thead-dark">
                <tr className="text-center">
                  <th scope="col">#</th>
                  <th scope="col">Issue Image</th>
                  <th scope="col">Issue Summary</th>
                  <th scope="col">Issue Provider</th>
                  <th scope="col">Date</th>
                  <th></th>
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
                          <p>Name: {item.name}</p>
                          <p>
                            Email:{" "}
                            <a href={`mailto:${item.email}`}>{item.email}</a>
                          </p>
                          <p>
                            Phone No:{" "}
                            <a
                              href={`https://api.whatsapp.com/send?phone=${item.phone}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.phone}
                            </a>
                          </p>
                        </td>
                        <td>{item.issue_date}</td>
                        <th>
                          <select
                            className="mb-2 p-2 rounded-2 bg-light"
                            onChange={(e) =>
                              setSelectedWorkerId(e.target.value)
                            }
                          >
                            <option>Select Worker</option>
                            {worker
                              .filter(
                                (item) =>
                                  item.department === currentUser.department
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
                              className="btn btn-info rounded-2 shadow mt-2"
                              onClick={() =>
                                assignWorker(selectedWorkerId, item.id)
                              }
                            >
                              Assign
                            </button>
                          </div>
                        </th>
                        <th>
                          <select
                            id="issue_type"
                            name="issue_type"
                            className="mb-2 p-2 rounded-2 bg-light"
                            onChange={(e) =>
                              setselectedDepartment(e.target.value)
                            }
                          >
                            <option value="">Select a type...</option>
                            <option value="ICT">ICT</option>
                            <option value="estate">Estate</option>
                            <option value="academic">Academic</option>
                          </select>
                          <div>
                            <button
                              className="btn btn-info rounded-2 shadow mt-2"
                              onClick={() =>
                                assignDepartment(selectedDepartment, item.id)
                              }
                            >
                              Forward issue
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
    </div>
  );
}
