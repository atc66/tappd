import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div>
      <div>
        <Link to="/edit-profile">
          <i className="fas fa-user-circle" /> Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileActions;
