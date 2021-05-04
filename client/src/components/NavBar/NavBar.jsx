import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <h3>Steam Library Comparer</h3>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-link" to="/HowToUse">
              How to Use
            </Link>
            <Link className="nav-link" to="/AboutUs">
              About Us
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
