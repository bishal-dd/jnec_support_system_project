import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import AdminNav from "../AdminNavigationComp/AdminNav";
import { AuthContext } from "../../../context/AuthContext";
import ImageModal from "../AdminHome/ImageModule/ImageModal";
import "./assign.css";

export default function AssignComp() {
  const { currentUser } = useContext(AuthContext);
  const [event, setevent] = useState([]);
  const [worker, setWorker] = useState([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);

  const assignWorker = async (workerId, issueId) => {
    console.log(workerId);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/assign_issue/${issueId}`,
        {
          id: issueId,
          worker_id: workerId,
        }
      );
      if (response.data === "Assigned") {
        toast.success("Assigned", {
          className: "custom-toast",
          position: toast.POSITION.TOP_CENTER,
        });
      }
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
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/get_worker`
      );

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
      <div className="row">
        <div className="col-sm-2">
          <div>
            <AdminNav />
          </div>
        </div>
        <div className="col mt-5">
          <div className="table-wrapper">
            <table class="table table-striped table-hover table-bordered shadow mb-2 ">
              <thead className="thead-dark">
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
                      item.status === "assigned" &&
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
                        <td class="text-left">
                          <p>Name:{item.name}</p>
                          <p>
                            Email:
                            <a href={`mailto:${item.email}`}>{item.email}</a>
                          </p>
                          <p>
                            Phone No:
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
                            className="mb-2 p-2 rounded-2  bg-light"
                            onChange={(e) =>
                              setSelectedWorkerId(e.target.value)
                            }
                          >
                            {worker
                              .filter((ite) => ite.id === item.worker_id)
                              .map((item, index) => {
                                return (
                                  <option key={index}>{item.username}</option>
                                );
                              })}

                            {worker
                              .filter(
                                (ite) =>
                                  ite.department === currentUser.department &&
                                  ite.id !== item.worker_id
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
                              className="btn btn-info rounded-2 text-center"
                              onClick={() =>
                                assignWorker(selectedWorkerId, item.id)
                              }
                            >
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
    </div>
  );
}
