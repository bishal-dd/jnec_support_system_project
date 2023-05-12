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
    <div id="admin_container">
      <div className="col">
        <div></div>
        <div className="container-fluid">
          <table className="fl-table bg-light shadow">
            <thead className="table-items p-2">
              <tr>
                <th>SL No:</th>
                <th>Issues</th>
              </tr>
            </thead>
            <tbody>
              {event
                .filter((i) => i.worker_id === currentUser.id)
                .map((item, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.issue_summary}</td>
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
