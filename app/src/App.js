import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import logo from './logo.svg';
import Navbar from './components/Navbar';

import './App.css';

import * as Pages from "./pages";

class App extends Component {
  render() {
    const { dispatch, authenticated, errorMessage} = this.props;
    return (
      <div className="App">
        <Navbar 
        authenticated = {authenticated}
        errorMessage = {errorMessage}
        dispatch = {dispatch}
        />
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Busy Cards!!!</h2>
        </div>
        <p className="App-intro">
          This is a fullstack application built to people to pass around business cards digitally and connect with those around them.
        </p>
        <div>
          <Route path="/signup" component ={ Pages.CreateUser } />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {auth} = state;
  const { authenticated, errorMessage } = auth;

  return {
    authenticated,
    errorMessage
  }
}
export default connect(mapStateToProps)(App);
