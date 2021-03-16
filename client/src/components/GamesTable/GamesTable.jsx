import React from "react";
import "./GamesTable.scss";
import ProfileDisplay from "../ProfileDisplay/ProfileDisplay";

const GamesTable = (props) => {
  const profileNameAndImage = props.foundUsers.map((user, index) => {
    // let comma = "";
    // if (index < props.foundUsers.length - 1) {
    //   comma = ", ";
    // }
    return (
      <div className="display-name">
        <ProfileDisplay user={user} key={user.id} />
        {/* {comma}{" "} */}
      </div>
    );
  });

  const sharedOrOwned = props.foundUsers.length === 1 ? "owned" : "shared";

  return (
    <>
      <table className="table">
        <thead>
          <th className="profile-display">
            <div>
              <p className="games-count-text">
                {props.sharedGames.length} games {sharedOrOwned} by:{" "}
              </p>
              {profileNameAndImage}
            </div>
          </th>
        </thead>
        <tbody>
          {props.sharedGames.map((game, index) => {
            return (
              <tr key={index}>
                {/* The td elements of the table provide cushion & a line between each game */}
                <td>
                  <a
                    href={`https://store.steampowered.com/app/${game.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="game-banner-image"
                      src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.id}/${game.image}.jpg`}
                      alt={`${game.name} logo`}
                    />
                    {game.name}
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default GamesTable;
