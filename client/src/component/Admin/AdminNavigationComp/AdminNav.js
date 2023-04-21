import React from "react";
import { Link } from "react-router-dom";

export default function AdminNav() {
  return (
    <>
      <div className="container-md mt-5">
        <div className="row justify-content-center text-center gap-2 ">
          <div className="col d-grid ">
            <Link to="/admin" className="btn btn-info rounded-5 shadow">
              Home
            </Link>
          </div>
          <div className="col d-grid ">
            <Link to="/add" className="btn btn-info rounded-5 shadow">
              Add_Worker
            </Link>
          </div>
          <div className="col d-grid">
            <Link to="/editworker" className="btn btn-info rounded-5 shadow">
              Edit_Worker
            </Link>
          </div>
          <div className="col d-grid ">
            <Link to="/delete" className="btn btn-info rounded-5 shadow">
              Delete_Worker
            </Link>
          </div>
          <div className="col d-grid ">
            <Link to="/solve" className="btn btn-info rounded-5 shadow">
              Solve
            </Link>
          </div>
          <div className="col d-grid ">
            <Link to="/assign" className="btn btn-info rounded-5 shadow">
              Assign
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
