import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <section className="section-profile-header">
        <div className="row">
          <h2>{profile.user.name}</h2>
        </div>
        <div className="row">
          {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
          <ul>
            {isEmpty(profile.social && profile.social.twitter) ? null : (
              <li>
                <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter fa-2x" />
                </a>
              </li>
            )}
            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <li>
                <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook fa-2x" />
                </a>
              </li>
            )}
            {isEmpty(profile.social && profile.social.instagram) ? null : (
              <li>
                <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram fa-2x" />
                </a>
              </li>
            )}
          </ul>
        </div>
      </section>
    );
  }
}

export default ProfileHeader;
