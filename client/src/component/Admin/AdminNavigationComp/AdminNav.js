import React, { useState } from "react";
import {
  FaTrashAlt,
  FaUserPlus,
  FaUserEdit,
  FaCheck,
  FaHome,
} from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import "./adminav.css";
import { BsArrowLeftShort } from "react-icons/bs";

export default function AdminNav() {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const openSidebar = () => {
    setOpen(true);
  };

  return (
    <div className="flex">
      {!open && (
        <button className="open-btn" onClick={openSidebar}>
          <BsArrowLeftShort size="2rem" />
        </button>
      )}
      <div className={`sidebar h-100 relative ${open ? "" : "sidebar-closed"}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <BsArrowLeftShort size="2rem" />
        </button>
        <div className="mt-5 text-decoration-none">
          <li>
            <Link to="/admin" className="p-4 text-decoration-none text-white">
              <FaHome />
              <span className="p-2">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/add"
              className="p-4 text-decoration-none text-white"
            >
              <FaUserPlus />
              <span className="p-2">Add staff</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/editworker"
              className="p-4 text-decoration-none text-white"
            >
              <FaUserEdit />
              <span className="p-2">Edit staff</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/delete"
              className="p-4 text-decoration-none text-white"
            >
              <FaTrashAlt />
              <span className="p-2">Delete staff</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/assign"
              className="p-4 text-decoration-none text-white"
            >
              <MdAssignmentAdd />
              <span className="p-2">Assigned</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/working"
              className="p-4 text-decoration-none text-white"
            >
              <MdAssignmentAdd />
              <span className="p-2">Working</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/solve"
              className="p-4 text-decoration-none text-white"
            >
              <FaCheck /> <span className="p-2">Solved</span>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}
