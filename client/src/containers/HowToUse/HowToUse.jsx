import React from "react";
import "./HowToUse.scss";
import VanityURLImage from "../../ScreenShots/SteamVanityURL.jpg";
import ComparedGames from "../../ScreenShots/ComparedGames.jpg"
import SettingVanityURL from "../../ScreenShots/SettingVanityURL.jpg";


const HowToUse = () => {
  return (
    <div className="container">
      <div className="row">
        <h1 className="page-title">How To Use</h1>
      </div>

      <div className="row">
        <div className="horizontal-line"></div>
        <div className="col-sm-6">
          <h3 className="h3-text-header"> Overview of Steam Games Comparer</h3>
          <p className="written-instructions">
            Find out which games are shared within multiple users' libraries.
            Just type in the custom URL of up to 10 users to find out what games
            they share in common. The custom url is the last part of a user's
            profile url (e.g. http://steamcommunity.com/id/**"custom url"**).
          </p>
          <p className="written-instructions">
            By default it is the user's Steam ID number, but can be updated in
            the settings of your Steam profile. Make sure account settings for
            the profile and it's game library is public. For a tested example
            try any of these users: sammysticks, dabigcheezey, glowostent.
          </p>
        </div>
        <div className="col-sm-6">
          <img
            className="instructional-image"
            src={ComparedGames}
            alt="Example list of shared games"
          />
        </div>
      </div>

      <div className="row">
        <div className="thinner-horizontal-line"></div>
        <div className="col-sm-6">
          <h3 className="h3-text-header">
            How to Find Your Custom URL on Steam
          </h3>
          <p className="written-instructions">
            In order to find your custom URL on Steam, we strongly recommend
            that you login to Steam in your browser.
          </p>
          <p className="written-instructions">
            You can see in this screenshot that this user's custom URL and their
            profile name are NOT the same. They are not required to match. To
            work, Steam Games Comparer only wants that last part of the custom
            URL for each user. This is show by the bright red underline in the
            screenshot.
          </p>
        </div>
        <div className="col-sm-6">
          <img
            className="instructional-image"
            src={VanityURLImage}
            alt="Screenshot showing Steam custom URL underlined"
          />
        </div>
      </div>

      <div className="row">
        <div className="thinner-horizontal-line"></div>
        <div className="col-sm-6">
          <h3 className="h3-text-header">
            How to Set a Custom URL If You Don't Have One
          </h3>
          <p className="written-instructions">
            Again, we recommend doing this step by logging into Steam from your
            favorite browser.
          </p>
          <p className="written-instructions">
            Click on your username in the top right corner and go to "View
            profile". Click "Edit Profile" on the right side. Under the
            "General" tab, change the field "CUSTOM URL" to set a new custom
            URL. Click save at the bottom.
          </p>
        </div>
        <div className="col-sm-6">
          <img
            className="instructional-image"
            src={SettingVanityURL}
            alt="How to change custom URL in Steam profile settings"
          />
        </div>
      </div>
      {/* NEED: Instructions on setting profile & games lists as public */}
    </div>
  );
};

export default HowToUse;
