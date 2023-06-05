import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import ImageModal from "../AdminHome/ImageModule/ImageModal";
import AdminNav from "../AdminNavigationComp/AdminNav";

export default function AdminIssues() {
  const { currentUser } = useContext(AuthContext);
  const [event, setevent] = useState([]);

  const { id } = currentUser;

  const assignSolved = async (workerId, issueId) => {
    console.log(workerId);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/assign_solved/${issueId}`,
        { id: issueId, worker_id: workerId }
      );
      loadEvent();
      toast.success(response.data);

      // Refresh the event list to show the updated worker assignment
    } catch (error) {
      console.error(error);
    }
  };

  const assignWorking = async (workerId, issueId) => {
    console.log(workerId);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_URL}/assign_working/${issueId}`,
        { id: issueId, worker_id: workerId }
      );
      loadEvent();
      toast.success(response.data);

      // Refresh the event list to show the updated worker assignment
    } catch (error) {
      console.error(error);
    }
  };

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
    <div id="container" className="container">
      <div className="row p-3">
        <div className="col-sm-2">
          <AdminNav />
        </div>
        <div className="col mt-5">
          <div className="table-wrapper">
            <table className="table table-striped table-hover table-bordered shadow mb-2 ">
              <thead className="thead-dark p-2 ">
                <tr>
                  <th>SL No:</th>
                  <th scope="col">Issue Image</th>
                  <th scope="col">Issue Summary</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions </th>
                </tr>
              </thead>
              <tbody className="text-dark">
                {event
                  .filter(
                    (item) =>
                      item.worker_id === id &&
                      (item.status === "assigned" || item.status === "working")
                  )
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="col-md-3 p-3 text-center">
                          <ImageModal image={item.issue_image} />
                        </td>
                        <td>{item.issue_summary}</td>
                        <td>{item.issue_date}</td>
                        <td>
                          <button
                            className="btn btn-primary mb-2 mt-2 "
                            onClick={() => assignSolved(item.workerId, item.id)}
                          >
                            Solved
                          </button>
                          &nbsp;&nbsp;&nbsp;
                          {item.status !== "working" ? (
                            <button
                              className="btn btn-primary mb-2 mt-2 mr-2"
                              onClick={() =>
                                assignWorking(item.workerId, item.id)
                              }
                            >
                              Working
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary mb-2 mt-2"
                              onClick={() =>
                                assignWorking(item.workerId, item.id)
                              }
                              disabled={true}
                            >
                              Working
                            </button>
                          )}
                        </td>
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
