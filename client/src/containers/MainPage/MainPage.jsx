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
    usersNotFound: false,
  };

  componentDidMount() {
    document.addEventListener("keyup", function (e) {
      //Make sure full class list is in conditional to get enter key to submit compare games
      if (e.target && e.target.className === "form-control rounded-left") {
        if (e.keyCode === 13) {
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
    // The display warning about 10 user max will need to happen in render
  };

  compareGames = async (event) => {
    this.setState({
      isLoading: true,
      sharedGamesState: false,
      userObject: false,
      usersNotFound: false,
    });

    const usersArray = Object.values(this.state.usersToSearch);
    this.setState({ searchedUsers: usersArray });

    // This if / else checks if 1 or multiple users had been entered
    if (usersArray.length === 1) {
      axios
        //This API call calls the Steam API and puts user info into our database
        .post("/api/steamUsers", { usersArray })
        .then((res) => {
          if (res.data.userNotFound) {
            this.setState({ usersNotFound: res.data.notFoundUsers });
            console.log(
              "User wasn't found (this message coming from inside if res.userNotFound)"
            );
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
    } else if (usersArray.length > 1) {
      await axios
        .post("/api/steamUsers", {
          usersArray,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.userNotFound) {
            this.setState({ usersNotFound: res.data.notFoundUsers });
            if (this.state.searchedUsers.length === this.state.usersNotFound.length) {
              this.setState({isLoading: false});
            }
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
      // We discussed sending a user a warning to input at least one Vanity URL, but
      // we're sure users will understand that nothing will happen until they do that.
    }
  };

  // Deletes a user key:value pair from the usersToSearch state.
  // We separated this into it's own function originally because we used it in to places.
  // After some refactoring this is only used in one place now, in handleInputChange()
  deleteFromUsersToSearch = (name) => {
    let usersObject = { ...this.state.usersToSearch };
    delete usersObject[name];
    this.setState({
      usersToSearch: usersObject,
    });
  };

  handleInuptChange = (event) => {
    const { name, value } = event.target;
    if (value === "") {
      this.deleteFromUsersToSearch(name);
    } else {
      this.setState({
        usersToSearch: { ...this.state.usersToSearch, [name]: value },
      });
    }
  };

  deleteUserInputLine = (event) => {
    const { name } = event.target;

    let deletedRowIndexPosition = Number(name.slice(name.length - 1));
    // for loop for replacing the text of all input fields with the text of the following input field, starting with the deleted row
    for (let i = deletedRowIndexPosition; i < this.state.additionalUsers-1; i++) {
      let deletedInputField = document.getElementById(`user${i}`);
      let nextInputField = document.getElementById(`user${i + 1}`);
      deletedInputField.value = nextInputField.value;
    }
    
    let removeAUser = this.state.additionalUsers;
    removeAUser--;
    this.setState({ additionalUsers: removeAUser });

    let newUsersToSearch = {};
    for (let i = 0; i < this.state.additionalUsers-1; i++) {
      let currentInputField = document.getElementById(`user${i}`);
      newUsersToSearch[`user${i}`] = currentInputField.value;
    }
    this.setState({ usersToSearch: newUsersToSearch });
  };

  render() {
    // Following code causes an additional username input field
    // to render for each time the add user button is clicked
    // TODO: Display a message once 10 username input fields are reached
    const userInputs = [];
    for (let i = 0; i < this.state.additionalUsers; i++) {
      userInputs.push(
        <TextInput
          index={i}
          placeholder="Steam Vanity URL"
          name={"user" + i}
          value={this.state.users}
          onChange={this.handleInuptChange}
          onClick={this.deleteUserInputLine}
        />
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

          <div id="user-input-section">{userInputs}</div>

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
            <h3 id="user-not-found-warning">{`These user(s) were not found: ${this.state.usersNotFound.join(", ")}`}</h3>
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
