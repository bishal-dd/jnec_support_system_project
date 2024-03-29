import React, { useContext } from "react";
import "./navbarcomp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

export default function NavbarComp() {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem("token");

    // Navigate back to the login page
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-dark bg-body-tertiary">
      <div className="container-fluid">
        <img
          src={logo}
          width="160"
          className="rounded-2"
          height="50"
          alt="logo"
          id="logo_image"
        />

        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <img
            src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2012/10/threelines.png"
            width="40"
            className="rounded-2"
            alt="toogle"
          />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {!currentUser ? null : currentUser.role === "admin" ? (
                <Link to="/admin" className="nav-link active text-white">
                  Dashboard
                </Link>
              ) : currentUser.role === "viewer" ? (
                <Link to="/view" className="nav-link active text-white">
                  Dashboard
                </Link>
              ) : null}
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link active text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/check" className="nav-link active text-white">
                Status
              </Link>
            </li>

            <li className="nav-item">
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
      </div>
    </nav>
  );
}
