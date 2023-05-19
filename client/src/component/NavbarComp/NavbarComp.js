import React, { useContext } from "react";
import "./navbarcomp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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
          src="https://res.cloudinary.com/dauoerqib/image/upload/v1683799942/6_zvbrwu.png"
          width="160"
          className="rounded-2"
          height="50"
          alt="logo"
          id="logo_image"
        />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {!currentUser ? null : (
                <Link to="/admin" className="nav-link active text-white">
                  Dashboard
                </Link>
              )}
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
