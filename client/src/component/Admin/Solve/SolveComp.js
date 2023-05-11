import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import AdminNav from "../AdminNavigationComp/AdminNav";
import { AuthContext } from "../../../context/AuthContext";
import ImageModal from "../AdminHome/ImageModule/ImageModal";
import './solve.css';

export default function SolveComp() {
  const { currentUser } = useContext(AuthContext);
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
   
    <div id="admin_container">
      <div className="col">
      <div> <AdminNav /> </div>
      <div className="container-fuild">
        <table class="fl-table shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Issue Image</th>
              <th scope="col">Issue Summary</th>
              <th scope="col">Issue Provider</th>
              <th scope="col">Date</th>
              <th scope="col">Worker</th>
            </tr>
          </thead>
          <tbody>
            {event
              .filter(
                (item) =>
                  item.status === "solved" &&
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
    </div>
  );
}
