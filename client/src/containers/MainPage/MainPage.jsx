import React, { Component } from "react";
import "./MainPage.scss";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";

class MainPage extends Component {
  state = {
    users: ""
  };
  // need to setup a state to track state changes in text input fields
  
  compareGames = () => {
    // David did an if else to check if only one or multiple users had been entered.
    // we'll probably need a state to track how many users there are
    
  };

  handleInuptChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };
  
  render() {
    return (
      <>
        <div className="container">
          <h3>
            {" "}
            Compare your Steam games library to the libraries of 1 or more
            friends{" "}
          </h3>
          <TextInput placeholder="Steam Vanity URL" name="users" onChange={this.handleInuptChange}/>
          <Button text="Add User" />
          <Button text="Compare Games" />
        </div>
      </>
    );
  }
}

export default MainPage;
