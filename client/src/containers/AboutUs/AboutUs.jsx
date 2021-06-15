import React from 'react';
import DevProfile from "../../components/DevProfile/DevProfile";
import "./AboutUs.scss";
import SamProfilePic from "../../ProfilePictures/SamProfilePic.jpg";
import DavidProfilePic from "../../ProfilePictures/DavidProfilePic.jpg";

const AboutUs = () => {
    // We will need to pass the profile pics down as props to the DevProfile components
    return (
        <div>
            <h1>A little bit about the developers</h1>
            <DevProfile/>
            <DevProfile/>
        </div>
    );
};

export default AboutUs;