import React from "react";
import "./SharedGamesTable.scss";

const SharedGamesTable = (props) => {

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th> Shared Games </th>
          </tr>
        </thead>
        <tbody>
          {props.sharedGames.map((game, index) => {
            return (
              <tr key={index}>
                <td>{game}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SharedGamesTable;
