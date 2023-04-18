import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function DeleteWorkerComp() {
  const [worker, setWorker] = useState([]);

  const loadWorker = async () => {
    const response = await axios.get("http://localhost:3001/api/get_worker");
    console.log(response.data);
    setWorker(response.data);
  };

  useEffect(() => {
    loadWorker();
  }, []);

  const handleDelete = async (id) => {
    console.log(id);
    await axios.get(`http://localhost:3001/api/delete/${id}`).then((result) => {
      console.log(result.data);
      if (result.data === "Worker Deleted") {
        toast.success("Worker Deleted");
      }
    });
    window.location.reload();
  };

  return (
    <div id="editcontainer" className="">
      <table
        className="edit-container text-center 
        rounded-4 bg-light shadow"
      >
        <thead className="edit-items p-2 ">
          <tr>
            <th>SL No:</th>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {worker.map((item, index) => {
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
  );
}
