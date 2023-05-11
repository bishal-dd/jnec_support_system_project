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
import { useState } from "react";
import "./adminav.css";
import { BsArrowLeftShort } from "react-icons/bs";

export default function AdminNav() {
  const [open, setOpen] = useState(true);
  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="flex">
      <div className={`sidebar h-100 ${!true ? "w-40" : "w-20"} relative`}>
        <button
          className={`icon bg-white text-dark rounded-4 border border-dark ${
            !open ? "rotate-180" : ""
          }`}
          onClick={() => {
            console.log("Current value of open:", open);
            toggleSidebar();
          }}
        >
          <BsArrowLeftShort size="2rem" />
        </button>{" "}
        <h5 className="text-center"></h5>
        <div className="mt-5 text-decoration-none">
          <li>
            <Link to="/admin" class="p-4 text-decoration-none text-white">
              <FaHome />
              <span class="p-2">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/add" class="p-4 text-decoration-none text-white">
              <FaUserPlus />
              <span class="p-2">Add staff</span>
            </Link>
          </li>
          <li>
            <Link to="/editworker" class="p-4 text-decoration-none text-white">
              <FaUserEdit />
              <span class="p-2">Edit staff</span>
            </Link>
          </li>
          <li>
            <Link to="/delete" class="p-4 text-decoration-none text-white">
              <FaTrashAlt />
              <span class="p-2">Delete staff</span>
            </Link>
          </li>
          <li>
            <Link to="/assign" class="p-4 text-decoration-none text-white">
              <MdAssignmentAdd />
              <span class="p-2">Assigned</span>
            </Link>
          </li>
          <li>
            <Link to="/solve" class="p-4 text-decoration-none text-white">
              <FaCheck /> <span class="p-2">Solved</span>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
}
