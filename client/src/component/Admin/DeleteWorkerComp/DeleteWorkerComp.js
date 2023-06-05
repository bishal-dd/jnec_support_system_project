import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminNav from "../AdminNavigationComp/AdminNav";
import { AuthContext } from "../../../context/AuthContext";
import "./deleteworkercomp.css";

export default function DeleteWorkerComp() {
  const [worker, setWorker] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const loadWorker = async () => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/get_worker`);
    setWorker(response.data);
  };

  useEffect(() => {
    loadWorker();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    await axios
      .get(`${process.env.REACT_APP_URL}/delete/${id}`)
      .then((result) => {
        if (result.data === "Worker Deleted") {
          toast.success("Staff Deleted");
        }
      });
    window.location.reload();
  };

  return (
    <div className="container-fluid">
      <div className="row p-3">
        <div className="col-sm-2">
          <div className="sidebar">
            <AdminNav />
          </div>
        </div>

        <div className="col mt-5 ">
          <table className="table table-striped table-hover table-bordered shadow mb-2 ">
            <thead className="thead-dark p-2 text-center ">
              <tr>
                <th>SL No:</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-dark">
              {worker
                .filter((i) => i.department === currentUser.department)
                .map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>
                          <button
                            className="btn btn-success mb-2 mt-2 "
                            onClick={() => handleDelete(item.id)}
                          >
                            Remove
                          </button>
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
