import React from "react";
import "./HowToUse.scss";
import VanityURLImage from "../../ScreenShots/SteamVanityURL.jpg";

const HowToUse = () => {
  return (
    <div className="container">
      <div className="row">
        <h1 className="page-title">How To Use</h1>
      </div>

      <div className="row">
        <div className="horizontal-line"></div>
        <div className="col">
          <h3 className="h3-text-header"> Overview of Steam Games Comparer</h3>
          <p className="written-instructions">
            Find out which games are shared within multiple users' libraries.
            Just type in the vanity URL of up to 10 users to find out what games
            they share in common. The vanity url is the last part of a user's
            profile url (e.g. http://steamcommunity.com/profiles/**"vanity
            url"**). It is by default the user ID but can be found and updated
            in your profile section. Make sure account settings for the profile
            and it's game library is public. For a tested example try any of
            these users: sammysticks, dabigcheezey, glowostent.
          </p>
        </div>
        <div className="col"></div>
      </div>

      <div className="row">
        <div className="thinner-horizontal-line"></div>
        <div className="col">
          <img className="instructional-image" src={VanityURLImage} alt="Screenshot showing Steam vanity URL underlined"/>
        </div>
        <div className="col">
          <h3 className="h3-text-header">
            How to Find Your Vanity URL on Steam
          </h3>
          <p className="written-instructions">
            In order to find your Vanity URL on Steam, we strongly recommend that you login to Steam in your browser.
          </p>
        </div>
      </div>

      <div className="row">
        <div className="thinner-horizontal-line"></div>
        <div className="col">
          <h3 className="h3-text-header">
            How to Set a Vanity URL If You Don't Have One
          </h3>
        </div>
        <div className="col">
          <img className="instructional-image" alt="Screenshot showing Steam vanity URL underlined"/>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
