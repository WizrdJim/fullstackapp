import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {setLocation} from '../actions';
import { connect } from 'react-redux';
import Card from '../components/Card';
 
class User extends Component {
  constructor(props) {
    super()
    this.state = {
      longitude: 0,
      latitude: 0
    }
  }
  componentWillMount() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    
    const success = (pos) => {
      const crd = pos.coords;
      this.setState({
        latitude: crd.latitude,
        longitude: crd.longitude
      });
      this.props.setLocation(crd);
    };
    
    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
  componentDidMount() {

  }
  render() {
    return(
      <div>
        <Card 
          name = {this.props.card.name}
          title = {this.props.card.title}
          link = {this.props.card.link}
        />
        <div>Longitude: {this.state.longitude} Latitude: {this.state.latitude} </div>
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
User = withRouter(connect(mapStateToProps, {setLocation})(User))
export default User;