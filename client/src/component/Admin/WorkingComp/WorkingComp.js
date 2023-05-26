import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import AdminNav from "../AdminNavigationComp/AdminNav";
import { AuthContext } from "../../../context/AuthContext";
import ImageModal from "../AdminHome/ImageModule/ImageModal";
import "./workingcomp.css";
export default function WorkingComp() {
  const { currentUser } = useContext(AuthContext);
  const [event, setevent] = useState([]);
  const [worker, setWorker] = useState([]);

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
          <AdminNav />
        </div>

        <div className="col mt-5">
          <div className="table-wrapper">
            <table class="table table-striped table-hover table-bordered shadow mb-2  ">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Issue Image</th>
                  <th scope="col">Issue Summary</th>
                  <th scope="col">Issue Provider</th>
                  <th scope="col">Date</th>
                  <th scope="col">Staff</th>
                </tr>
              </thead>
              <tbody>
                {event
                  .filter(
                    (item) =>
                      item.status === "working" &&
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
    </div>
  );
}
