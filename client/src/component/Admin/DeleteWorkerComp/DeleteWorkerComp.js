import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AdminNav from "../AdminNavigationComp/AdminNav";
import { AuthContext } from "../../../context/AuthContext";
import "./deleteworkercomp.css";

export default function DeleteWorkerComp({ serverUrl }) {
  const [worker, setWorker] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const loadWorker = async () => {
    const response = await axios.get(`${serverUrl}/get_worker`);
    console.log(response.data);
    setWorker(response.data);
  };

  useEffect(() => {
    loadWorker();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    await axios.get(`${serverUrl}/delete/${id}`).then((result) => {
      console.log(result.data);
      if (result.data === "Worker Deleted") {
        toast.success("Worker Deleted");
      }
    });
    window.location.reload();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <div>
            <AdminNav />
          </div>
        </div>

        <div className="col">
          <table
            className="fl-table text-center 
                  rounded-4 bg-light shadow"
          >
            <thead className="edit-items p-2 ">
              <tr>
                <th>SL No:</th>
                <th>Name</th>
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

                        <button
                          className="btn btn-success mb-2 mt-2 "
                          onClick={() => handleDelete(item.id)}
                        >
                          Remove
                        </button>
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
