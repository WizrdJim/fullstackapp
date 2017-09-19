import React, { Component } from "react";
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from "react-router-dom";
import { createcard } from '../actions';

class CreateCard extends Component {
  handleFormSubmit({ name, title, link }) {
    console.log('name: ' + name);
    console.log(link);
    const parentID = localStorage.getItem('id');
    const card = {parentID, name, title, link };
    this.props.createcard(card);
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
    // There needs fields for name, title, and Confirm title
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit = {handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset>
            <label>name:</label>
            <Field name = "name" component = "input" type = "text" />
          </fieldset>
          <fieldset>
            <label>title:</label>
            <Field name = "title" component = "input" type = "text" />
          </fieldset>
          <fieldset>
            <label>Confirm title:</label>
            <Field name = "link" component = "input" type = "text" />
          </fieldset>
          <button action = "submit">Sign Up</button>
          {this.renderAlert()}
        </form>
      <div>CreateCard</div>
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
CreateCard = connect( mapStateToProps,{ createcard })(CreateCard);

export default reduxForm({
  form: 'createcard',
  fields: ['name', 'title', 'link'],
})(CreateCard);
