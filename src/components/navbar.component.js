import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg bg-dark">
        <Link to="/" className="navbar-brand" style={{ color: "white" }}>
          FitTrack Pro
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ color: "white" }}>
                Exercises
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link" style={{ color: "white" }}>
                Create Exercise Log
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user" className="nav-link" style={{ color: "white" }}>
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
