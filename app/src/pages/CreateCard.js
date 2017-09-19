import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { createcard } from '../actions';

class CreateCard extends Component {
  constructor() {
    super()
    this.state= {
      name: '',
      title: '',
      link: ''
    }
    this.handleName = this.handleName.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleLink = this.handleLink.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleName(event) {
    this.setState({name: event.target.value})
  }
  handleTitle(event) {
    this.setState({title: event.target.value})
  }
  handleLink(event) {
    this.setState({link: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
    const { name, title, link } = this.state;
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
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <fieldset>
            <label>name:</label>
            <input value={this.state.name} type = 'text' placeholder ='Name' onChange={this.handleName}/>
          </fieldset>
          <fieldset>
            <label>title:</label>
            <input value={this.state.title} type = 'text' placeholder ='Title' onChange={this.handleTitle}/>
          </fieldset>
          <fieldset>
            <label>Confirm title:</label>
            <input value={this.state.link} type = 'text' placeholder ='Link' onChange={this.handleLink}/>
          </fieldset>
          <button type = "submit">Sign Up</button>
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
CreateCard = withRouter(connect( mapStateToProps,{ createcard })(CreateCard));
export default CreateCard;
