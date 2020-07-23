import React from "react";
import "./UserGamesTable.scss";

const UserGamesTable = (props) => {
  // These class names are from when we did it in handlebars
  // <div class="column is-one-third user-one-column" id="single-user-table"></div>
  console.log("props: ", props);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th id="username"> {props.userInfo.user.personaName} games list</th>
          </tr>
        </thead>
        <tbody>
          {props.userInfo.user.Games.map(game=>{
            return(
              <tr>
                <td>{game.name}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};

export default UserGamesTable;
