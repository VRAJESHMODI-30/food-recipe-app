import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo-blue.png";

const Navbar = () => {
  let history = useNavigate();
  let location = useLocation();

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    history("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt=""
            width="30"
            height="30"
            className="d-inline-block align-text-top mx-1"
            style={{
              invert: 100,
            }}
          />
          CookBook
        </Link>
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/fooditem">
                Food Item
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myrecipe">
                My Recipe
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link
                className="btn btn-outline-primary mx-1"
                to="/login"
                role="button"
              >
                Login
              </Link>
              <Link
                className="btn btn-outline-primary mx-1"
                to="/signup"
                role="button"
              >
                Signup
              </Link>
            </form>
          ) : (
            <button
              className="btn btn-outline-primary mx-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
