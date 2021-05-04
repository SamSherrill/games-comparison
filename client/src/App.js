import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import NavBar from "./components/NavBar/NavBar";
import MainPage from "./containers/MainPage/MainPage";
import AboutUs from "./containers/AboutUs/AboutUs";
import HowToUse from "./containers/HowToUse/HowToUse";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/AboutUs">
          <AboutUs/>
        </Route>
        <Route exact path = "/HowToUse"> 
          <HowToUse/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
