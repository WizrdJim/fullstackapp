import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getLocation } from '../actions';
import { connect } from 'react-redux';
import Card from '../components/Card';
 
class User extends Component {
  componentDidMount() {
    this.props.getLocation();
  }
  render() {
    return(
      <div>
        <Card 
          name = {this.props.card.name}
          title = {this.props.card.title}
          link = {this.props.card.link}
        />
        <button type='Submit'> Gps Stiff maybe????</button>
        <Link to='/createcard'> Update Card </Link>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    card: state.card,
    user: state.user
  }
}
User = withRouter(connect(mapStateToProps, { getLocation })(User))
export default User;