import React from 'react';
import "./DevProfile.scss";
import Button from "../../components/Button/Button";

const DevProfile = (props) => {
    let { DevName, DevProfilePic, GitHubLink, DevPortfolio, LinkedUrlEnd, DevBio } = props.dev
    return (
        <div className="card">
            <img className="card-img-top" src={DevProfilePic} alt={`${DevName}'s face`}/>
            <div className="card-body">
                <h5 className="card-title">{DevName}</h5>
                <p className="card-text">{DevBio}</p>
                {/* <Button text="TEST" onClick={()=>window.open('www.google.com', '_blank').focus()}/> */}
                <a href={DevPortfolio} className="btn btn-primary">Portfolio</a>
                <a href={`https://github.com/${GitHubLink}`} className="btn btn-primary">Github</a>
                <a href={`https://www.linkedin.com/in/${LinkedUrlEnd}`} className="btn btn-primary">LinkedIn</a>
            </div>
        </div>
    );
};

export default DevProfile;

//           <div className="row">
//             <div className="col">
//               <Button
//                 text="Compare Games"
//                 id="compare-games-button"
//                 onClick={this.compareGames}
//                 type="submit"
//               />
//             </div>

//             <div className="col">
//               <Button
//                 text="Add User"
//                 id="add-user-button"
//                 onClick={this.addUser}
//               />
//             </div>
//           </div>