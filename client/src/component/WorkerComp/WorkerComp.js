import React, { useContext, useState, useEffect } from "react";
import "./workercomp.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import ImageModal from "../Admin/AdminHome/ImageModule/ImageModal";
export default function WorkerComp({ serverUrl }) {
  const { currentUser } = useContext(AuthContext);
  const [event, setevent] = useState([]);

  const { id } = currentUser;

  const assignSolved = async (workerId, issueId) => {
    console.log(workerId);
    try {
      const response = await axios.put(
        `${serverUrl}/assign_solved/${issueId}`,
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
        `${serverUrl}/assign_working/${issueId}`,
        { id: issueId, worker_id: workerId }
      );
      loadEvent();
      toast.success(response.data);

      // Refresh the event list to show the updated worker assignment
    } catch (error) {
      console.error(error);
    }
  };

  const assignLeave = async () => {
    console.log(id);
    try {
      const response = await axios.put(`${serverUrl}/assign_leave/${id}`, {
        id: id,
      });
      loadEvent();
      toast.success(response.data);

      // Refresh the event list to show the updated worker assignment
    } catch (error) {
      console.error(error);
    }
  };

  const loadEvent = async () => {
    try {
      const response = await axios.get(`${serverUrl}/get_issue`);
      console.log(response.data);
      setevent(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEvent();
  }, []);

  return (
    <div id="container" className="">
      <table
        className="fl-table table-container text-center
       bg-light"
      >
        <thead className="table-items p-2 text-center">
          <tr>
            <th>SL No:</th>
            <th scope="col">Issue Image</th>
            <th scope="col">Issue Summary</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
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
                  <button
                    className="btn btn-primary mb-2 mt-2"
                    onClick={() => assignSolved(item.workerId, item.id)}
                  >
                    Solved
                  </button>
                  {item.status !== "working" ? (
                    <button
                      className="btn btn-primary mb-2 mt-2"
                      onClick={() => assignWorking(item.workerId, item.id)}
                    >
                      Working
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary mb-2 mt-2"
                      onClick={() => assignWorking(item.workerId, item.id)}
                      disabled={true}
                    >
                      Working
                    </button>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
