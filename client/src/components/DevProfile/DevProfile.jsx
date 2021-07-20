import React from 'react';
import "./DevProfile.scss";
import Button from "../../components/Button/Button";

const DevProfile = (props) => {
    let { DevName, DevProfilePic, GitHubUrlEnd, DevPortfolio, LinkedUrlEnd, DevBio } = props.dev
    return (
        <div className="card">
            <img className="card-img-top" src={DevProfilePic} alt={`${DevName}'s face`}/>
            <div className="card-body">
                <h5 className="card-title">{DevName}</h5>
                <p className="card-text">{DevBio}</p>
                <a href={DevPortfolio} target="_blank" rel="noopener noreferrer"><Button>Portfolio</Button></a>
                <a href={`https://github.com/${GitHubUrlEnd}`} target="_blank" rel="noopener noreferrer"><Button>Github</Button></a>
                <a href={`https://www.linkedin.com/in/${LinkedUrlEnd}`} target="_blank" rel="noopener noreferrer"><Button>LinkedIn</Button></a>
            </div>
        </div>
    );
};

export default DevProfile;