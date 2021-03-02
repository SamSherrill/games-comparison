import React from "react";
import "./ProfileDisplay.scss";

const ProfileDisplay = ({ user }) => {
  return (
    <div>
      {/* <card className = "card"> */}
      <a className="profile-display" href={user.profileUrl} target="_blank">
        <img
          className="profilePicture"
          src={user.avatarUrl}
          alt={`${user.personaName} profile`}
        />
        <p>{user.personaName}</p>
      </a>
      {/* </card> */}
    </div>
  );
};

export default ProfileDisplay;
