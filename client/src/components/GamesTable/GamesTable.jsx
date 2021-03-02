import React from "react";
import "./GamesTable.scss";
import ProfileDisplay from "../ProfileDisplay/ProfileDisplay";

const GamesTable = (props) => {
  // 2/22/2021 - We want to make the users name (vanityUrl) a link rather than just play text
  // To do this, we will need to change what we're passing into userString above

  // const userString = props.searchedUsers.join(", ");

  // const arrayOfProfileUrls = props.foundUsers[0].avatarUrl;

  const profileNameAndImage = props.foundUsers
    .map((user) => {
      return <ProfileDisplay user={user} key={user.id}/>;
    });

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {props.foundUsers.length === 1 ? (
              <th className="profile-display">
                {props.sharedGames.length} games owned by {profileNameAndImage}
              </th>
            ) : (
              <th className="profile-display">
                {props.sharedGames.length} games shared by {profileNameAndImage}
              </th>
            )}
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
