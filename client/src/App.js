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
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/AboutUs" component={AboutUs}/>
        <Route exact path="/HowToUse" component={HowToUse}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

/* <Router>
      <div className="content">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/account" component={UserAccount} />
          <Route component={NoMatch} />
        </Switch>
        <Footer />
      </div>
    </Router> */