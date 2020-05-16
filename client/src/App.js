import React, { Component } from 'react';
import './App.css';

import { Provider } from "react-redux";
import myStore from "./store"

import Landing from "./components/pre_auth/Landing.js";
import Register from "./components/pre_auth/Register.js";
import Login from "./components/pre_auth/Login.js";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Authorisation, Private Routes
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";

import Dashboard from "./components/home/Dashboard";
import Graph from "./components/tracker/Tracker";
import Calculator from "./components/calculator/Calculator";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  myStore.dispatch(setCurrentUser(decoded));// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    myStore.dispatch(logoutUser());    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {

  render() {
    return (
      <Provider store={myStore}>
        <Router>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/calculator" component={Calculator} />

            {/* <Switch> */}
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/dashboard/graph" component={Graph} />
            {/* </Switch> */}
        </Router>
      </Provider>
    );
  }
}

export default App;
