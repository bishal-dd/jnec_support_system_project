import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNav from "../AdminNavigationComp/AdminNav";

export default function EditWorkerComp() {
  const [worker, setWorker] = useState([]);

  const loadWorker = async () => {
    const response = await axios.get("http://localhost:3001/api/get_worker");
    console.log(response.data);
    setWorker(response.data);
  };

  useEffect(() => {
    loadWorker();
  }, []);

  return (
    <div id="admin_container">
      <div className="row">
        <div className="col-md-2 border border-dark">
          <AdminNav />
        </div>

        <div className="col mt-5">
          <div className="container-fluid">
            <div className="col flex-nowrap">
              <div className="container text-center justify-content-center">
                <table className="table-container text-center bg-light shadow">
                  <thead className="table-items p-2 text-center">
                    <tr>
                      <th>SL No:</th>
                      <th>Worker</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {worker.map((item, index) => {
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
        </div>
      </div>
    </div>
  );
}
