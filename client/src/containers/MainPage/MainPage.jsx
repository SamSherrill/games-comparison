import React, { Component } from 'react';
import "./MainPage.scss";
import TextInput from "../../components/TextInput/TextInput";
import Button from "../../components/Button/Button";

class MainPage extends Component {
    render() {
        return (
          <>
            <div className="container">
              <h3>
                {" "}
                Compare your Steam games library to the libraries of 1 or more
                friends{" "}
              </h3>
              <TextInput placeholder="Steam Vanity URL"/>
              <Button text="Add User" />
              <Button text="Compare Games" />
            </div>
          </>
        );
    }
}

export default MainPage;