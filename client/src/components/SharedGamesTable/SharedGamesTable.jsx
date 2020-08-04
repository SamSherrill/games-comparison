import React from "react";
import "./SharedGamesTable.scss";

const SharedGamesTable = (props) => {
  const userString = props.searchedUsers.join(", ");

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th> Shared Games for {userString}</th>
          </tr>
        </thead>
        <tbody>
          {props.sharedGames.map((game, index) => {
            return (
              <tr key={index}>
                <td>{game.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SharedGamesTable;
