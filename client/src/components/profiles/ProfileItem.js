import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div>
        <div className="row">
          <h3 className="col span-1-of-3">
            <span>{profile.user.name}</span>
          </h3>
          <p className="col span-1-of-3">
            {isEmpty(profile.location) ? null : <span>{profile.location}</span>}
          </p>
          <Link to={`/profile/${profile.handle}`} className="btn">
            View Profile
          </Link>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
