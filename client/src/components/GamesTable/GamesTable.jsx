import React from "react";
import "./GamesTable.scss";

const GamesTable = (props) => {
  const userString = props.searchedUsers.join(", ");

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {props.foundUsers.length === 1 ? (
              <th>
                {props.sharedGames.length} games owned by {userString}
              </th>
            ) : (
              <th>
                {props.sharedGames.length} games shared by {userString}
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
