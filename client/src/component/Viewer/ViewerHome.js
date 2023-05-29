import React, { useState } from "react";
import axios from "axios";
import ImageModal from "../Admin/AdminHome/ImageModule/ImageModal";
import "./viewhome.css";
import ExcelJS from "exceljs";

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

  const exportToExcel = (e) => {
    e.preventDefault();

    // Filter the issueData based on the selected filters
    const filteredData = issueData.filter((item) => {
      if (selectedMonth && item.issue_date.substring(0, 7) !== selectedMonth)
        return false;
      if (selectedIssueType && item.issue_type !== selectedIssueType)
        return false;
      if (
        selectedStatus &&
        item.status !== selectedStatus &&
        !(selectedStatus === "not_assigned" && !item.status)
      )
        return false;
      return true;
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Issue Data");

    worksheet.columns = [
      { header: "SL No", key: "slNo", width: 10 },
      { header: "Issue Type", key: "issueType", width: 20 },
      { header: "Issue Summary", key: "issueSummary", width: 30 },
      { header: "Date", key: "date", width: 15 },
      { header: "Status", key: "status", width: 15 },
      { header: "Staff that solved", key: "staff", width: 20 },
    ];

    filteredData.forEach((item, index) => {
      worksheet.addRow({
        slNo: index + 1,
        issueType: item.issue_type,
        issueSummary: item.issue_summary,
        date: item.issue_date,
        status: !item.status ? "Not Assigned" : item.status,
        staff: worker
          .filter((ite) => ite.id === item.worker_id)
          .map((ite) => ite.username)
          .join(", "),
      });
    });

    const fileName = "issue_data.xlsx";
    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error exporting to Excel:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 mt-5">
          <form className="row justify-content-center">
            <div className="col-md-4 mb-3">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="col-md-4 mb-3">
              <select
                value={selectedIssueType}
                onChange={(e) => setSelectedIssueType(e.target.value)}
                className="form-control"
              >
                <option value="">All</option>
                <option value="ICT">ICT</option>
                <option value="estate">Estate</option>
                <option value="academic">Academic</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="form-control"
              >
                <option value="">All</option>
                <option value="assigned">Assigned</option>
                <option value="working">Working</option>
                <option value="solved">Solved</option>
                <option value="not_assigned">Not Assigned</option>
              </select>
            </div>

            <div className="col-4 mt-3">
              <button
                className="btn btn-primary col-12"
                onClick={(e) => {
                  loadEvent(e);
                  loadWorker(e);
                }}
              >
                Search
              </button>
              <button
                className="btn btn-success col-12 mt-2"
                onClick={exportToExcel}
                disabled={issueData.length === 0}
              >
                Export to Excel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="table-responsive">
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
                    if (
                      selectedStatus &&
                      i.status !== selectedStatus &&
                      !(selectedStatus === "not_assigned" && !i.status)
                    )
                      return false;
                    if (
                      selectedStatus &&
                      i.status !== selectedStatus &&
                      !(selectedStatus === "not_assigned" && !i.status)
                    )
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
    </div>
  );
}
