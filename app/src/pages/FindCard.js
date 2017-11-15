import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '../components/Card';
import { findNearby } from '../actions';

/*
****The find card component displays the data of nearby cards
****It allows you to tap on cards and connect or save more for later

*/
class FindCard extends Component {
  constructor(props) {
    super()
    this.state = {
      longitude: 0,
      latitude: 0
    }
  }
  componentDidMount() {
    console.log("FindCard's initial coords: " + JSON.stringify(this.props.coords));
    const {longitude, latitude} = this.props.coords;
    console.log("long: "+longitude+" lat: "+latitude)

    this.props.findNearby([longitude, latitude]);
  }
  render() {
    return(
      <div>
        <div>
          <Card name = {this.props.card.name} title = {this.props.card.title} link = {this.props.card.link}/>
        </div>
        <div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    card: state.card,
    nearby: state.nearby,
    coords: state.user
  };
};

FindCard = withRouter(connect( mapStateToProps, { findNearby })(FindCard));
export default FindCard;