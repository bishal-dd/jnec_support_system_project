import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function SuperAdmin() {
  const [admin, setadmin] = useState([]);

  const loadadmin = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/get_admin`
      );
      console.log(response.data);
      setadmin(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadadmin();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col mt-5">
          <table className="table table-striped table-hover table-bordered shadow mb-2 ">
            <thead className=" p-2 text-center thead-dark">
              <tr>
                <th>SL No:</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {admin.map((i, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{i.username}</td>
                    <td>{i.email}</td>
                    <td>{i.department}</td>
                    <td>
                      <Link
                        to="/edit_admin"
                        className="btn btn-success mb-2 mt-2"
                        state={i}
                      >
                        Edit
                      </Link>
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
