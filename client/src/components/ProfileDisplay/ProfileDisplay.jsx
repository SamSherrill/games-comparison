import React from "react";
import "./ProfileDisplay.scss";

const ProfileDisplay = ({ user }) => {
  // This displayName will end up in the table header of GamesTable as a clickable hyperlink text & image of the found user's profile name & pic
  // The if / else statement below creates a display name with both the user's personaName (their name as it appears in Steam to other users) and their vanity URL, if they have both
  let displayName = "";
  if (user.vanityUrl === user.personaName) {
    displayName = user.personaName;
  } else {
    displayName = `${user.personaName} (${user.vanityUrl})`;
  }

  return (
    <div>
      {/* For whatever reason in order to get the image & username on the same line, this profile-display class is also necessary here
      in the a tag, even though it's also used in GamesTable.jsx */}
      <a className="profile-display" href={user.profileUrl} target="_blank">
        <img
          className="profilePicture"
          src={user.avatarUrl}
          alt={`${displayName} profile`}
        />
        <p>{displayName}</p>
      </a>
    </div>
  );
};

export default ProfileDisplay;
