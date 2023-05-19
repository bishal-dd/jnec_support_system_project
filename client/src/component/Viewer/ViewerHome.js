import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewerHome() {
  const [issueData, setIssueData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedIssueType, setSelectedIssueType] = useState("");

  const loadEvent = async () => {
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
  console.log(selectedMonth);

  useEffect(() => {
    loadEvent();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col mt-5 text-center">
          <form>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              placeholder="Select Month"
            />

            <select
              value={selectedIssueType}
              onChange={(e) => setSelectedIssueType(e.target.value)}
            >
              <option value="">Select a type...</option>
              <option value="ICT">ICT</option>
              <option value="estate">Estate</option>
              <option value="academic">Academic</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
}
