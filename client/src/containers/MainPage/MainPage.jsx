import React, { Component } from "react";
import "./MainPage.scss";
import axios from "axios";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import UserGamesTable from "../../components/UserGamesTable/UserGamesTable";
import SharedGamesTable from "../../components/SharedGamesTable/SharedGamesTable";

class MainPage extends Component {
  // below we setup a state to track state changes in the username text input field
  // We also initialize a couple over states for the user search we are going to do later for multiple users

  // Likely NEEDED CHANGE: userToSearch likely needs to be sent
  // to the backend as an array. We will probably leave it as
  // an object for now, then convert it to an array right as we
  // send it to the backend.

  state = {
    additionalUsers: 2,
    usersToSearch: {},
    userObject: false,
  };

  addUser = (event) => {
    // We don't want to compare the games lists of more than 10 users
    if (this.state.additionalUsers < 10) {
      this.setState({
        additionalUsers: this.state.additionalUsers + 1,
      });
    }
    // The display warning about 10 user max will need to happen in render, I think
  };

  compareGames = async (event) => {
    // David did an if else to check if only one or multiple users had been entered.
    // we'll probably need a state to track how many users there are
    console.log("Comparing games for: " + this.state.usersToSearch.user0);
    const usersArray = Object.values(this.state.usersToSearch);
    console.log("user array: ", usersArray);
    if (usersArray.length === 1) {
      axios
        //This API call calls the Steam API and puts user info into our database
        .post("/api/steamUsers", { usersArray })
        .then((res) => {
          console.log(res.data);

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
    } else if (usersArray.length > 1) {
      await axios
        .post("/api/steamUsers", {
          usersArray,
        })
        .then((res) => {
          console.log(res);
          if (res.userNotFound) {
            // $("#errors").append(
            //   `<h1 class="error-type">Vanity URLs invalid for users: ${res.notFoundUsers}</h1><p class="error-message">Make sure to use the user's vanity URL: <a href="https://steamcommunity.com/discussions/forum/1/537402115094224389/">How to find Steam vanity URL</a></p>`
            // );
            console.log(res.userNotFound);
          }
        });
      //adds users games to db
      await axios.post("/api/games", {
        usersArray,
      });
      //compares games
      await axios
        .post("/sharedGames", {
          usersArray,
        })
        .then((res) => {
          // $("#shared-games-container").empty().append(res);
          console.log(res);
        });
    } else {
      console.log("must input at least one user");
    }
  };

  handleInuptChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      usersToSearch: { ...this.state.usersToSearch, [name]: value },
    });
  };

  render() {
    // Following code causes an additional username input field
    // to render for each time the add user button is clicked
    // TODO: Display a message once 10 username input fields are reached
    const userInputs = [];
    for (let i = 1; i < this.state.additionalUsers; i++) {
      userInputs.push(
        <TextInput
          placeholder="Steam Vanity URL"
          name={"user" + i}
          value={this.state.users}
          onChange={this.handleInuptChange}
        />
      );
    }
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
            name="user0"
            value={this.state.users}
            onChange={this.handleInuptChange}
          />
          {userInputs}
          <Button text="Add User" onClick={this.addUser} />
          <Button text="Compare Games" onClick={this.compareGames} />
          {this.state.userObject && (
            <UserGamesTable userInfo={this.state.userObject} />
          )}
        </div>
      </>
    );
  }
}

export default MainPage;
