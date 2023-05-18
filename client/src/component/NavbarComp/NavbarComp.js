import React, { useContext, useState } from "react";
import "./navbarcomp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useProSidebar } from "react-pro-sidebar";

export default function NavbarComp() {
  const { currentUser } = useContext(AuthContext);
  const { collapseSidebar } = useProSidebar();

  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem("token");

    // Navigate back to the login page
    navigate("/");
    window.location.reload();
  };

  return (
    <nav
      className="navbar fixed-top navbar-dark navbar-expand-lg bg-dark"
      id="navbar"
    >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <i className="ri-menu-line"></i>
        <ul className="navbar-nav p-2 max-auto mb-2 ">
          <li className="nav-item px-2 ">
            {!currentUser ? null : (
              <Link to="/admin" className="nav-link active text-white">
                Dashboard
              </Link>
            )}
          </li>
          <li className="nav-item px-2 ">
            <Link to="/" className="nav-link active text-white">
              Home
            </Link>
          </li>
          <li className="nav-item px-2">
            {localStorage.getItem("token") ? (
              <li
                onClick={handleLogout}
                className="nav-link active text-white text-right"
              >
                Logout
              </li>
            ) : (
              <Link to="/login" className="nav-link active text-white">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
