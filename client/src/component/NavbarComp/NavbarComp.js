import React from "react";
import "./navbarcomp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavbarComp() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem("token");

    // Navigate back to the login page
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar fixed-top navbar-light navbar-expand-lg bg-dark p-1 mb-8 " >
      <div className="container-fluid" >
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <img
        src="https://res.cloudinary.com/dnmtsuwhc/image/upload/v1678645849/u5ffbzghsirppkrzughq.png"
        width="60"
        class="rounded-2"
        height="50"
        alt="logo"
        id="logo_image"
      /> 
      <div className="mb-6">
        <div className="collapse navbar-collapse " id="navbarSupportedContent" >
          <ul className="navbar-nav p-2 me-auto mb-2 mb-lg-0">
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
      </div>
      </div>
    </nav>
  );
}
