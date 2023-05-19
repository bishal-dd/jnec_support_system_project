import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNav from "../AdminNavigationComp/AdminNav";
import { AuthContext } from "../../../context/AuthContext";

import "./editworkercomp.css";

export default function EditWorkerComp({ serverUrl }) {
  const [worker, setWorker] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const loadWorker = async () => {
    const response = await axios.get(`${serverUrl}/get_worker`);
    setWorker(response.data);
  };

  useEffect(() => {
    loadWorker();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <div className="sidebar">
            <AdminNav />
          </div>
        </div>

        <div className="col mt-5">
          <table className="table table-striped table-hover table-bordered shadow mb-2 ">
            <thead className=" p-2 text-center thead-dark">
              <tr>
                <th>SL No:</th>
                <th>Staffs</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {worker
                .filter((i) => i.department === currentUser.department)
                .map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>
                          <Link
                            to="/admin/edit"
                            state={item}
                            className="btn btn-success mb-2 mt-2"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
