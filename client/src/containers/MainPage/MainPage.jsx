import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainPage.scss";
import axios from "axios";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";
import GamesTable from "../../components/GamesTable/GamesTable";
import LoadingWheel from "../../components/LoadingWheel/LoadingWheel";

class MainPage extends Component {
  state = {
    inputFieldCount: 2,
    usersToSearch: {},
    userObject: false,
    sharedGamesState: false,
    isLoading: false,
    usersNotFound: false,
    foundUsers: false,
    privateUsers: false,
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
    if (this.state.inputFieldCount < 10) {
      this.setState({
        inputFieldCount: this.state.inputFieldCount + 1,
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
      foundUsers: false,
      privateUsers: false,
    });

    let usersArray = Object.values(this.state.usersToSearch);

    if (usersArray.length > 0) {
      await axios
        .post("/api/steamUsers", {
          usersArray,
        })
        .then((res) => {
          this.setState({ foundUsers: res.data.foundUsers });
          if (res.data.userNotFound) {
            this.setState({ usersNotFound: res.data.notFoundUsers });
            if (
              this.state.foundUsers.length ===
              this.state.usersNotFound.length
            ) {
              this.setState({ isLoading: false });
            }
          }
        });

      // On the backend, this API .post will first pings Steam's API to get the list of owned
      // games for each user we're searching for. Then it finds or creates a row of data in our
      // database for each game. Then it creates the many to many relationships between
      // each user & their owned games.
      await axios
        .post("/api/games", {
          usersArray,
        })
        .then((res) => {
          // Filter out users with private games lists from our foundUsers state
          // because we won't be able to compare their games lists
          const newFoundUsers = this.state.foundUsers.filter((user) => {
            let filter = true;
            res.data.privateUsers.forEach((privateUser) => {
              if (privateUser === user.vanityUrl) {
                filter = false;
              }
            });
            return filter;
          });
          usersArray = usersArray.filter((user) => {
            let filter = true;
            res.data.privateUsers.forEach((privateUser) => {
              if (user.includes(privateUser)) {
                filter = false;
              }
            });
            return filter;
          });
          this.setState({
            privateUsers: res.data.privateUsers,
            foundUsers: newFoundUsers,
          });
        })
        .catch((err) => console.log(err));

      //turns off loading wheel if no user's games can be compared
      if (this.state.foundUsers.length === 0) {
        this.setState({
          isLoading: false,
        });
      }

      //compares games
      await axios
        .post("/sharedGames", {
          usersArray,
        })
        .then((res) => {
          //order games list by game name
          res.data.sharedGames.sort((a,b) =>{
            if(a.name < b.name) return -1;
            return 1;
          })
          this.setState({ isLoading: false });
          this.setState({
            // Sets this state equal to the sharedGames array sent back from other-controller
            sharedGamesState: res.data.sharedGames,
          });
        })
        .catch((er) => {
          this.setState({ isLoading: false });
          console.log(er);
        });
    } else {
      // If the user didn't enter at least one user, then the loading wheel is turned off
      this.setState({ isLoading: false });
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
    // for loop that replaces the text of all input fields with the text of the following input field, starting with the deleted row
    for (
      let i = deletedRowIndexPosition;
      i < this.state.inputFieldCount - 1;
      i++
    ) {
      let deletedInputField = document.getElementById(`user${i}`);
      let nextInputField = document.getElementById(`user${i + 1}`);
      deletedInputField.value = nextInputField.value;
    }

    this.setState({ inputFieldCount: this.state.inputFieldCount -1  });

    // this loop updates state based on the new lines on screen
    let newUsersToSearch = {};
    for (let i = 0; i < this.state.inputFieldCount - 1; i++) {
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
    for (let i = 0; i < this.state.inputFieldCount; i++) {
      userInputs.push(
        <TextInput
          key={`user ${i}`}
          index={i}
          placeholder="Steam Vanity URL"
          name={"user" + i}
          value={this.state.users}
          onChange={this.handleInuptChange}
          onClick={this.deleteUserInputLine}
        />
      );
    }

    // Setup the text for warning the website user about any users with private games lists
    var privateUsersWarning = "";
    if (this.state.privateUsers.length === 1) {
      privateUsersWarning =
        "This user has their games list set as private, or they own no games:";
    } else if (this.state.privateUsers.length > 1) {
      privateUsersWarning =
        "These users have their games list set as private, or they own no games:";
    }

    // Setup the text for warning the website user about any invalid custom URLs
    var usersNotFoundWarning = "";
    if (this.state.usersNotFound.length === 1) {
      usersNotFoundWarning = "No user was found using this custom URL:";
    } else if (this.state.usersNotFound.length > 1) {
      usersNotFoundWarning = "No users were found using these custom URLs:";
    }

    return (
      <>
        <div className="container">
          <h4 id="headline">
            {" "}
            Compare your Steam games library to the libraries of 1 or more
            friends{" "}
          </h4>

          <div>{userInputs}</div>

          <div className="row">
            <div className="col">
              <Button
                id="compare-games-button"
                onClick={this.compareGames}
                type="submit"
              >
                Compare Games
              </Button>
            </div>

            <div className="col">
              <Button id="add-user-button" onClick={this.addUser}>
                Add User
              </Button>
            </div>
          </div>

          {this.state.usersNotFound && (
            <h4 className="user-or-games-not-found-warning">
              {`${usersNotFoundWarning} ${this.state.usersNotFound.join(
                ", "
              )} --- To get help setting your games list to public, see our How To Use page `}
              <Link to="/HowToUse">HERE</Link>
            </h4>
          )}

          {this.state.privateUsers && this.state.privateUsers.length > 0 && (
            <h4 className="user-or-games-not-found-warning">
              {`${privateUsersWarning} ${this.state.privateUsers.join(
                ", "
              )}  --- If you're unsure what a custom URL is, or how to set one up, see our How To Use page `}
              <Link to="/HowToUse">HERE</Link>
            </h4>
          )}

          {this.state.isLoading && (
            <LoadingWheel isLoading={this.state.isLoading} />
          )}

          {this.state.sharedGamesState && (
            <GamesTable
              sharedGames={this.state.sharedGamesState}
              foundUsers={this.state.foundUsers}
            />
          )}
        </div>
      </>
    );
  }
}

export default MainPage;
