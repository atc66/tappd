import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav>
        <div className="row">
          <Link to="/">
            <i className="fas fa-beer logo" />
          </Link>
          <ul className="main-nav js--main-nav">
            <li>
              <Link to="/profiles">tapprs</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
