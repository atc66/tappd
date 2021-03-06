import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <ul className="main-nav">
        <li>
          <Link to="/location">happy hours</Link>
        </li>
        <li>
          <Link to="/profiles">callrs</Link>
        </li>
        {/* <li>
          <Link to="/dashboard">My Profile</Link>
        </li> */}
        <li>
          <a href="" onClick={this.onLogoutClick.bind(this)}>
            <span> logout </span>
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="main-nav">
        <li>
          <Link to="/profiles">callrs</Link>
        </li>
        <li>
          <Link to="/register">sign up</Link>
        </li>
        <li>
          <Link to="/login">log in</Link>
        </li>
      </ul>
    );

    return (
      <nav>
        <div className="row">
          <Link to="/">
            <i className="fas fa-beer logo" />
          </Link>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
