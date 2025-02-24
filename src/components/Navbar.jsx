import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {useAuth} from "../AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          🍽️ Food Share
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>

            {user && (
              <>
              <li className="nav-item">
              <a className="nav-link" href="/food-feed">Food Feed</a>
            </li>
                <li className="nav-item">
                  <a className="nav-link" href="/food-post">Post Food</a>
                </li>
            <li className="nav-item">
                <a className="nav-link" href="/request">Request</a>
            </li>
                {user.is_staff && (
                  <li className="nav-item">
                    <a className="nav-link" href="/admin">
                      <span className="text-primary">Admin Dashboard</span>
                    </a>
                  </li>
                )}
              </>
            )}
          </ul>
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Welcome, {user.firstname} {user.lastname}
                    {user.is_staff && <span className="badge bg-primary ms-2">Admin</span>}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-danger mx-2"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login-page">Login</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;