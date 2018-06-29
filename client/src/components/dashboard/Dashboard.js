import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check if logged in user has profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="box">
              Welcome,{" "}
              <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <div style={{ marginBottom: "60px" }} />
            <button onClick={this.onDeleteClick.bind(this)} className="btn">
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User logged in with no profile
        dashboardContent = (
          <div>
            <p className="box">Welcome, {user.name} !</p>
            <p className="box">
              You have not set up a profile please add info.
            </p>
            <Link to="/create-profile" className="btn btn-full btn-profile">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <section className="dashboard">
        <div className="row">
          <div className="row">
            <div className="row">
              <h2>Dashboard</h2>
              {dashboardContent}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
