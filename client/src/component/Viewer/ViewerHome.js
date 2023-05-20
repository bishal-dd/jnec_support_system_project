import React, { useState } from "react";
import axios from "axios";
import ImageModal from "../Admin/AdminHome/ImageModule/ImageModal";
import "./viewhome.css";

export default function ViewerHome() {
  const [issueData, setIssueData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedIssueType, setSelectedIssueType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [worker, setWorker] = useState([]);

  const loadEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/get_issue`
      );
      const response_data = response.data;
      setIssueData(response_data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadWorker = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/get_worker`
      );
      setWorker(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-8  mt-5">
          <form className="row justify-content-center">
            <div className="col-4">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="form-control"
                style={{ width: "200px" }}
              />
            </div>

            <div className="col-4">
              <select
                value={selectedIssueType}
                onChange={(e) => setSelectedIssueType(e.target.value)}
                className="form-control"
                style={{ width: "200px" }}
              >
                <option value="">All</option>
                <option value="ICT">ICT</option>
                <option value="estate">Estate</option>
                <option value="academic">Academic</option>
              </select>
            </div>

            <div className="col-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="form-control"
                style={{ width: "200px" }}
              >
                <option value="">All</option>
                <option value="assigned">Assigned</option>
                <option value="working">Working</option>
                <option value="solved">Solved</option>
              </select>
            </div>

            <div className="col-4 mt-3">
              <button
                className="btn btn-primary col-10"
                onClick={(e) => {
                  loadEvent(e);
                  loadWorker(e);
                }}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <table className="table table-striped table-hover table-bordered shadow mb-2">
            <thead className="thead-dark">
              <tr>
                <th>SL No:</th>
                <th>Issue Image</th>
                <th>Issue Type</th>
                <th>Issue Summary</th>
                <th>Date</th>
                <th>Status</th>
                <th>Staff that solved</th>
              </tr>
            </thead>
            <tbody className="text-dark">
              {issueData
                .filter((i) => {
                  if (
                    selectedMonth &&
                    i.issue_date.substring(0, 7) !== selectedMonth
                  )
                    return false;
                  if (selectedIssueType && i.issue_type !== selectedIssueType)
                    return false;
                  if (selectedStatus && i.status !== selectedStatus)
                    return false;
                  return true;
                })
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <ImageModal image={item.issue_image} />
                      </td>
                      <td>{item.issue_type}</td>
                      <td>{item.issue_summary}</td>
                      <td>{item.issue_date}</td>
                      <td>{!item.status ? "Not Assigned" : item.status}</td>
                      <td>
                        {worker
                          .filter((ite) => ite.id === item.worker_id)
                          .map((item, index) => {
                            return <p key={index}>{item.username}</p>;
                          })}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
