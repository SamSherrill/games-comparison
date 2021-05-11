import React from "react";
import "./HowToUse.scss";

const HowToUse = () => {
  return (
    <div className="container">
      <div className="row">
        <h2 className="page-title">How To Use</h2>
      </div>
      <div className="row">
        <p className="written-instructions">
          Find out which games are shared within multiple users' libraries. Just
          type in the vanity URL of up to 10 users to find out what games they
          share in common. The vanity url is the last part of a user's profile
          url (e.g. http://steamcommunity.com/profiles/**"vanity url"**). It is
          by default the user ID but can be found and updated in your profile
          section. Make sure account settings for the profile and it's game
          library is public. For a tested example try any of these users:
          sammysticks, dabigcheezey, glowostent.
        </p>
      </div>
      <div className="row">
        {/* Screenshot of example image of entered names and returned games list - See readme */}
      </div>
    </div>
  );
};

export default HowToUse;
