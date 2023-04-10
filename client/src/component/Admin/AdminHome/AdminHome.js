import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function AdminHome() {
  const [event, setevent] = useState([]);

  const loadEvent = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/get_issue");
      console.log(response.data);
      setevent(response.data);
      console.log(event);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadEvent();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col text-center">
          <Link to="/add" className="btn btn-primary">
            Addworker
          </Link>
        </div>
        <div className="col">
          <Link to="/edit" className="btn btn-primary">
            Editworker
          </Link>
        </div>
        <div className="col">
          <Link to="/delete" className="btn btn-primary">
            Deleteworker
          </Link>
        </div>
      </div>
      <div className="row">
        <table class="table text-center mt-5 table-bordered border-dark">
          {event.map((item) => {
            return (
              <>
                <thead>
                  <tr>
                    <th scope="col">Issues</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Link to="" className="link-dark ">
                        {item.name}
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
                      <button className="btn btn-primary">Assign</button>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </div>
  );
}
