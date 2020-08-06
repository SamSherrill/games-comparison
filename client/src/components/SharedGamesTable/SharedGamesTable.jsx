import React from "react";
import "./SharedGamesTable.scss";

const SharedGamesTable = (props) => {
  const userString = props.searchedUsers.join(", ");

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th> Shared games for {userString}</th>
          </tr>
        </thead>
        <tbody>
          {props.sharedGames.map((game, index) => {
            return (
              <tr key={index}>
                <td>
                  <a href={`https://store.steampowered.com/app/${game.id}`} target="_blank">
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

export default SharedGamesTable;
