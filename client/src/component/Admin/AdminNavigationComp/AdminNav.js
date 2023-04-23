import React from "react";
import {
  FaTrashAlt,
  FaUserPlus,
  FaUserEdit,
  FaCheck,
  FaHome,
} from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { Link } from "react-router-dom";
export default function AdminNav() {
  return (
    <div class="row">
      <div class="col-md-12 bg-dark ">
        <div class="align-items-center align-items-sm-start  text-white min-vh-100">
          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <li class="nav-item">
              <Link to="/admin" class="nav-link align-middle px-0">
                <FaHome />{" "}
                <span class="ms-1 d-none d-sm-inline">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/add" class="nav-link align-middle px-0">
                <FaUserPlus />{" "}
                <span class="ms-1 d-none d-sm-inline">Add Worker</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/editworker" class="nav-link px-0 align-middle">
                <FaUserEdit />{" "}
                <span class="ms-1 d-none d-sm-inline">Edit Worker</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/delete" class="nav-link px-0 align-middle">
                <FaTrashAlt />{" "}
                <span class="ms-1 d-none d-sm-inline">Delete Worker</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/assign" class="nav-link px-0 align-middle">
                <MdAssignmentAdd />{" "}
                <span class="ms-1 d-none d-sm-inline">Assigned</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/solve" class="nav-link px-0 align-middle">
                <FaCheck /> <span class="ms-1 d-none d-sm-inline">Solved</span>{" "}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
