import React from 'react';
import DevProfile from "../../components/DevProfile/DevProfile";
import "./AboutUs.scss";
import SamProfilePic from "../../ProfilePictures/SamProfilePic.jpg";
import DavidProfilePic from "../../ProfilePictures/DavidProfilePic.jpg";

const AboutUs = () => {
    // We will late pass these ProfileDetails down as props to the DevProfile component

    const DavidProfileDetails = {
        DevName: "David Rospond",
        DevProfilePic: DavidProfilePic,
        DevPortfolio: "https://rospond-portfolio.herokuapp.com/",
        GitHubUrlEnd: "drospond",
        LinkedUrlEnd: "david-rospond-60054393",
        DevBio: "Cheese maker turned software developer, I started programming in 2019 and haven't looked back since. I like to keep my programming skills tight through side projects while on occasion still keeping things a little cheesy.",
    };
    const SamProfileDetails = {
        DevName: "Sam Sherrill",
        DevProfilePic: SamProfilePic,
        DevPortfolio: "https://github.com/SamSherrill",
        GitHubUrlEnd: "SamSherrill",
        LinkedUrlEnd: "samuelsherrill",
        DevBio: "My 10+ years in sales were great, but I like coding a whole lot more. In January 2020 I was accepted into Georgia Tech's full-time coding bootcamp, and I made the decision to leave sales permanently. I've been loving my career as a software engineer!",
    };

    return (
        <div className="container">
            <div className="row">
                <h1 className="page-title">A Little About the Developers</h1>
                <div className="horizontal-line"></div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <DevProfile dev={DavidProfileDetails}/>
                </div>
                <div className="col-sm">
                    <DevProfile dev={SamProfileDetails}/>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;