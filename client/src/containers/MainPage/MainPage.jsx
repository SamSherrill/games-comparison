import React, { Component } from "react";
import "./MainPage.scss";
import axios from "axios";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import UserGamesTable from "../../components/UserGamesTable/UserGamesTable";
import SharedGamesTable from "../../components/SharedGamesTable/SharedGamesTable";
import LoadingWheel from "../../components/LoadingWheel/LoadingWheel";

class MainPage extends Component {
  // Setup a state for tracking username text input field
  // Also initialize state for searching multiple users

  state = {
    additionalUsers: 2,
    usersToSearch: {},
    searchedUsers: "",
    userObject: false,
    sharedGamesState: false,
    isLoading: false,
    usersNotFound: false
  };

  componentDidMount() {
    document.addEventListener("keyup", function (e) {
      if (e.target && e.target.className === "form-control") {
        if (e.keyCode === 13) {
          // Prevent default may or may not be needed
          e.preventDefault();
          document.getElementById("compare-games-button").click();
        }
      }
    });
  }

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
    this.setState({
      isLoading: true,
      sharedGamesState: false,
      userObject: false,
      usersNotFound: false,
    });
    // we'll probably need a state to track how many users there are
    const usersArray = Object.values(this.state.usersToSearch);
    this.setState({searchedUsers: usersArray});

    // This if / else checks if 1 or multiple users had been entered
    if (usersArray.length === 1) {
      axios
        //This API call calls the Steam API and puts user info into our database
        .post("/api/steamUsers", { usersArray })
        .then((res) => {

          if (res.data.userNotFound) {
            // Display err to user explaining that the user wasn't found
            // We believe that this means they weren't found in our DB, or using Steam's API
            // The code in other-controller.js confirms that
            this.setState({usersNotFound: res.data.notFoundUsers});
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
                  this.setState({ isLoading: false });
                  this.setState({
                    userObject: returnedUser.data,
                  });
                  console.log(returnedUser.data);
                });
            });
        })
        .catch((er) => {
          this.setState({ isLoading: false });
          console.log(er);
        });
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
          console.log(res.data);
          if (res.data.userNotFound) {
            this.setState({usersNotFound: res.data.notFoundUsers});
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
          this.setState({ isLoading: false });
          console.log(res.data.sharedGames);
          this.setState({
            sharedGamesState: res.data.sharedGames,
          });
        })
        .catch((er) => {
          this.setState({ isLoading: false });
          console.log(er);
        });
    } else {
      this.setState({ isLoading: false });
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
    for (let i = 0; i < this.state.additionalUsers; i++) {
      userInputs.push(
        // <div className="row">
        <TextInput
          index={i}
          placeholder="Steam Vanity URL"
          name={"user" + i}
          value={this.state.users}
          onChange={this.handleInuptChange}
        />
        // </div>
      );
    }

    return (
      <>
        <div className="container">
          <h4 id="headline">
            {" "}
            Compare your Steam games library to the libraries of 1 or more
            friends{" "}
          </h4>

          {userInputs}

          <div className="row">
            <div className="col">
              <Button
                text="Compare Games"
                id="compare-games-button"
                onClick={this.compareGames}
                type="submit"
              />
            </div>

            <div className="col">
              <Button
                text="Add User"
                id="add-user-button"
                onClick={this.addUser}
              />
            </div>
          </div>

          {this.state.usersNotFound && (
            <h3 id="user-not-found-warning">{`These user(s) were not found: ${this.state.usersNotFound}`}</h3>
          )}

          {this.state.isLoading && (
            <LoadingWheel isLoading={this.state.isLoading} />
          )}

          {this.state.userObject && (
            <UserGamesTable userInfo={this.state.userObject} />
          )}
          {this.state.sharedGamesState && (
            <SharedGamesTable
              sharedGames={this.state.sharedGamesState}
              searchedUsers={this.state.searchedUsers}
            />
          )}
        </div>
        {/* <footer>
          {" "}
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            {" "}
            www.flaticon.com
          </a>
        </footer> */}
      </>
    );
  }
}

export default MainPage;
