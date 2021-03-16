import React from "react";
import "./GamesTable.scss";
import ProfileDisplay from "../ProfileDisplay/ProfileDisplay";

const GamesTable = (props) => {
  const profileNameAndImage = props.foundUsers.map((user, index) => {
    let comma = "";
    if (index < props.foundUsers.length - 1) {
      comma = ", ";
    }
    return (
      <>
        <ProfileDisplay user={user} key={user.id} />
        {comma}{" "}
      </>
    );
  });

  const sharedOrOwned = props.foundUsers.length === 1 ? "owned" : "shared";

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {/* Could we OR do we even want to condense the following lines like we did the if statement in profileNameAndImage above? */}
            <th className="profile-display">
              {props.sharedGames.length} games {sharedOrOwned} by{" "}
              {profileNameAndImage}
            </th>
          </tr>
        </thead>
        <tbody>
          {props.sharedGames.map((game, index) => {
            return (
              <tr key={index}>
                <td>
                  <a
                    href={`https://store.steampowered.com/app/${game.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="gameBannerImage"
                      src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.id}/${game.image}.jpg`}
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
