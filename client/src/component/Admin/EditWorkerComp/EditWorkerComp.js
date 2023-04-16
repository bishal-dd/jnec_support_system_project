import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function EditWorkerComp() {
  const [worker, setWorker] = useState([]);

  const loadWorker = async () => {
    const response = await axios.get("http://localhost:3001/api/get_addworker");
    console.log(response.data);
    setWorker(response.data);
  };

  useEffect(() => {
    loadWorker();
  }, []);

  return (
    <div>
      <div id="container" className="">
        <table
          className="table-container text-center
       bg-light"
        >
          <thead className="table-items p-2 text-center">
            <tr>
              <th>SL No:</th>
              <th>Worker</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {worker.map((item, index) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.username}</td>
                    <td>
                      <Link
                        to="/edit"
                        state={item}
                        className="btn btn-primary mb-2 mt-2"
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
  );
}
