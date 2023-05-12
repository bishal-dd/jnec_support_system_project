import React, { useState, useEffect } from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

import axios from "axios";

export default function ViewerHome({ serverUrl }) {
  const [issues_by_month, set_issues_by_month] = useState([]);
  const [solved_and_assigned_issues, setSolved_and_assigned_issues] = useState(
    []
  );
  const [types_of_issues, set_types_of_issues] = useState([]);
  const loadEvent = async () => {
    let count_assigned = 0;
    let count_solved = 0;
    let count_working = 0;
    let count_ICT = 0;
    let count_estate = 0;
    let count_academic = 0;
    let i = 0;

    try {
      const response = await axios.get(`${serverUrl}/get_issue`);
      const response_data = response.data;

      const issues_count_by_month = {};
      response_data.forEach((issue) => {
        const month = issue.issue_date.split("-")[1];
        issues_count_by_month[month] = issues_count_by_month[month]
          ? issues_count_by_month[month] + 1
          : 1;
      });

      const issues_data = [];
      for (let month in issues_count_by_month) {
        issues_data.push({ month: month, count: issues_count_by_month[month] });
      }
      set_issues_by_month(issues_data);

      for (i; i <= response_data.length - 1; i++) {
        if (response_data[i].status === "assigned") {
          count_assigned += 1;
        } else if (response_data[i].status === "working") {
          count_working += 1;
        } else {
          count_solved += 1;
        }

        if (response_data[i].issue_type === "ICT") {
          count_ICT += 1;
        } else if (response_data[i].issue_type === "estate") {
          count_estate += 1;
        } else if (response_data[i].issue_type === "academic") {
          count_academic += 1;
        }
      }
      setSolved_and_assigned_issues([
        {
          name: "Assigned",
          value: count_assigned,
        },
        { name: "Solved", value: count_solved },
        { name: "Working_On", value: count_working },
      ]);

      set_types_of_issues([
        {
          name: "ICT",
          value: count_ICT,
        },
        { name: "Estate", value: count_estate },
        { name: "Academic", value: count_academic },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEvent();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col text-center">
          <p className="h3">Issues Status</p>
          <PieChart width={400} height={400}>
            <Pie
              data={solved_and_assigned_issues}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {solved_and_assigned_issues.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="col ">
          <p className="h3">Types of Issues Solved</p>
          <PieChart width={400} height={400}>
            <Pie
              data={types_of_issues}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {types_of_issues.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-5 text-center justify-content-center">
          <p className="h3">Issues by Month</p>
          <LineChart width={600} height={300} data={issues_by_month}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
