import React, { Component } from "react";
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link, Redirect, withRouter } from "react-router-dom";
import { register } from '../actions';

class CreateUser extends Component {
  handleFormSubmit({ username, password, confirmPassword }) {
    console.log('username: ' + username);
    console.log(confirmPassword);
    this.props.register(username, password, confirmPassword);
    Window.location = '/createcard';
  }
  renderAlert = () => {
    if (!this.props.errorMessage) return null;
    return (
      <h3> {this.props.errorMessage} </h3>
    ) 
  };
  render() {
    // Use reduxForm to build the sign up form
    // Check the other components to see how reduxForm is used
    // There needs fields for Username, Password, and Confirm Password
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset>
            <label>Username:</label>
            <Field name = "username" component = "input" type = "text" />
          </fieldset>
          <fieldset>
            <label>Password:</label>
            <Field name = "password" component = "input" type = "password" />
          </fieldset>
          <fieldset>
            <label>Confirm Password:</label>
            <Field name = "confirmPassword" component = "input" type = "password" />
          </fieldset>
          <button action = "submit">Sign Up</button>
          {this.renderAlert()}
        </form>
      <div>Sign Up</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.auth.errorMessage,
    authenticated: state.auth.authenticated
  };
};

// Make sure to correctly fill in this `connect` call
CreateUser = withRouter(connect( mapStateToProps,{ register })(CreateUser));

export default reduxForm({
  form: 'createuser',
  fields: ['username', 'password', 'confirmPassword'],
})(CreateUser);
