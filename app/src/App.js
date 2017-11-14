import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar';

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
        history = {this.props.history}
        />
        <div>
          <Route exact path="/" component ={Pages.Home} />
          <Route path="/signup" component = { Pages.CreateUser } />
          <Route path="/updatecard" component = {Pages.UpdateCard} />
          <Route path="/user" component = {Pages.User} />
          <Route path="/findcards" component = {Pages.FindCard} />
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
export default withRouter(connect(mapStateToProps)(App));
