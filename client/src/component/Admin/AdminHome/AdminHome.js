import React from "react";
import { Link } from "react-router-dom";
export default function AdminHome() {
  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
      </div>
      <div className="row">
        <table class="table text-center mt-5 table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">Event</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to="" className="link-dark border border-0">
                  issue_name
                </Link>
              </td>
              <td>
                <select>
                  <option>Worker name</option>
                  <option>Worker name</option>
                  <option>Worker name</option>
                  <option>Worker name</option>
                </select>
              </td>
              <td>
                <button>Assign</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
