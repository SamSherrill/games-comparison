import React from "react";
import "./SharedGamesTable.scss";

const SharedGamesTable = (props) => {
  console.log("props: ", props);
  
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th> Shared Games</th>
          </tr>
        </thead>
        <tbody>
          {props.userInfo.user.Games.map((game) => {
            return (
              <tr>
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
