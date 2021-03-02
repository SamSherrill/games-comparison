import React from "react";
import "./ProfileDisplay.scss";

const ProfileDisplay = ({ user }) => {
  return (
    <div>
      {/* For whatever reason in order to get the image & username on the same line, this profile-display class is also necessary here
      in the a tag, even though it's also used in GamesTable.jsx */}
      <a className="profile-display" href={user.profileUrl} target="_blank">
        <img
          className="profilePicture"
          src={user.avatarUrl}
          alt={`${user.personaName} profile`}
        />
        <p>{user.personaName}</p>
      </a>
    </div>
  );
};

export default ProfileDisplay;
