import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function WorkerHistory() {
  const { currentUser } = useContext(AuthContext);
  const [event, setevent] = useState([]);

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

  useEffect(() => {
    loadEvent();
  }, []);

  return (
    <div id="admin_container" className="container">
      <div className="row ">
        <div className="col mt-5">
          <Link to="/worker" class="btn btn-primary  mb-3">
            Home
          </Link>
          <table className="table table-striped table-hover table-bordered shadow mb-2 ">
            <thead className="thead-dark p-2 ">
              <tr>
                <th>SL No:</th>
                <th scope="col">Issue Summary</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody className="text-dark">
              {event
                .filter(
                  (i) => i.worker_id === currentUser.id && i.status === "solved"
                )
                .map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.issue_summary}</td>
                        <td>{item.issue_date}</td>
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
