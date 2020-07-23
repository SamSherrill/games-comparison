import React, { Component } from "react";
import "./MainPage.scss";
import axios from "axios";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import UserGamesTable from "../../components/UserGamesTable/UserGamesTable";

class MainPage extends Component {
  // below we setup a state to track state changes in the username text input field
  // We also initialize a couple over states for the user search we are going to do later for multiple users
  state = {
    users: "",
    additionalUsers: 1,
    usersToSearch: ["user1"],
    userObject: false,
  };

  compareGames = (event) => {
    // David did an if else to check if only one or multiple users had been entered.
    // we'll probably need a state to track how many users there are
    console.log("Comparing games for: " + this.state.users);
    const usersArray = [this.state.users];
    axios
      //This API call calls the Steam API and puts user info into our database
      .post("/api/steamUsers", { usersArray })
      .then((res) => {
        console.log(res.data);
        // Code from the handlebars version:
        // if (res.userNotFound) {
        //   $("#shared-games-container").empty();
        //   return $("#errors").append(
        //     `<h1 class="error-type">Vanity URLs invalid or privacy settings preventing access for users: ${res.notFoundUsers}</h1><p class="error-message">Make sure privacy settings are public for the Steam profile. Make sure to use the user's vanity URL: <a href="https://steamcommunity.com/discussions/forum/1/537402115094224389/">How to find Steam vanity URL</a> </p>`
        //   );
        // }
        // $.post("/api/games", {
        //   usersArray,
        // })
        //   .done(() => {
        //     $.get("/SteamUser/" + usersArray[0], {
        //       userOne: usersArray[0],
        //     }).done(
        //       () => (window.location.href = "/SteamUser/" + usersArray[0])
        //     );
        //   })
        //   .catch((er) => console.log(er));

        if (res.userNotFound) {
          // Display err to user explaining that the user wasn't found
          // We believe that this means they weren't found in our DB, or using Steam's API
          // The code in other-controller.js confirms that
          console.log(
            "User wasn't found (this message coming from inside if res.userNotFound)"
          );

          // TO DO: Figure out how to do this in react, because our old code used jQuery & handlebars (probably with a state prop called error)
          //error will display based on conditional rendering
        }
        // 2nd layer api call: inserts games and user-game relationships into our database from Steam API
        // ^^^ REASSESS THIS in refactoring. The many layers of API calls are almost certainly a major performance hit
        axios
          .post("/api/games", {
            usersArray,
          })
          .then(() => {
            // 3rd layer api call: retrieves user and their game info from out database to be displayed on the frontend
            // ^^^ REASSESS in refactoring
            axios
              .get("/SteamUser/" + usersArray[0], {
                userOne: usersArray[0],
              })
              .then((returnedUser) => {
                this.setState({ userObject: returnedUser.data });
                console.log(returnedUser.data);
              });
          });
      })
      .catch((er) => console.log(er));
    //Next steps would be to go through the else statement in the index.js file in the handlebars version and
    //add one section at a time both to ensure that it works and to understand each
    //API call that is made in the function

    // If I were writing this from scratch, things to consider:
    // We don't want to duplicate info in the data: not the user's info, nor the game's info
    // However, we may want to update their info if we find it needs an update (might address in refactoring)
    // We'll deal with performance during refactoring
  };

  handleInuptChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    // let GamesTable;
    // if (this.state.userObject !== {}) {
    //   GamesTable = <UserGamesTable user={this.state.userObject} />;
    // }

    return (
      <>
        <div className="container">
          <h3>
            {" "}
            Compare your Steam games library to the libraries of 1 or more
            friends{" "}
          </h3>
          <TextInput
            placeholder="Steam Vanity URL"
            name="users"
            value={this.state.users}
            onChange={this.handleInuptChange}
          />
          <Button text="Add User" />
          <Button text="Compare Games" onClick={this.compareGames} />
          {/* {GamesTable}; */}
          {this.state.userObject && <UserGamesTable userInfo={this.state.userObject}/>}
        </div>
      </>
    );
  }
}

export default MainPage;
