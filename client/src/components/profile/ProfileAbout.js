import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    const firstName = profile.user.name.trim().split(" ")[0];
    return (
      <div className="row">
        <section className="section-profile-about">
          <div className="row">
            <h3>{firstName}'s Bio</h3>
            <p>{isEmpty(profile.bio) ? null : <span>{profile.bio}</span>}</p>
          </div>
        </section>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
