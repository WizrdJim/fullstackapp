import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class Login extends Component {
  handleClick(event) {
    const username = this.refs.username;
    const password = this.refs.password;
    const user = { username: username.value.trim(), password: password.value.trim()}
    this.props.onLoginClick(user);
  }
  render() {
    const { errorMessage } = this.props;
    return(
      <div>
        <form>
        <input type= 'text' ref='username' className="form-control" placeholder='Username'/>
        <input type= 'password' ref='password' className="form-control" placeholder= 'Password'/>
        <button onClick = {( event ) => this.handleClick(event)} className= "btn btn-primary">
          Login
        </button>
        { errorMessage && 
          <p> {errorMessage}</p>
        }
        </form>
      </div>
    );
  }
}