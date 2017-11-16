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
      latitude: 0,
      nearbyList: [],
    }
  }
  componentWillMount() {
    console.log("FindCard's initial coords: " + JSON.stringify(this.props.coords));
    const {longitude, latitude} = this.props.coords;
    this.props.findNearby([longitude, latitude]);
    console.log(this.props.nearbyList)
  }
  componentDidMount() {
    console.log("NearbyList in CDM: " + JSON.stringify(this.props.nearbyList))
    this.setState({
      nearbyList: this.props.nearbyList
    })
  }
  cardList(nearbyList)  {
    if(nearbyList.length > 0) {
       nearbyList.map((user) => {
        return <Card
          name = {user.bCard.name}
          title = {user.bCard.title}
          link = {user.bCard.link}
        />
      });
    } else {
      return "Empty";
    }
  }
  render() {
    console.log("NearbyList state after mount: " + this.state.nearbyList)    
    return(
      <div>
        <div>
          <Card name = {this.props.card.name} title = {this.props.card.title} link = {this.props.card.link}/>
        </div>
        <div>
           {
            this.state.nearbyList.map((user) => {
            return <Card key={user.username.toString()}
            name = {user.bCard.name}
            title = {user.bCard.title}
            link = {user.bCard.link}
            />
           })}
      </div>
    </div>
  )}
}


const mapStateToProps = (state) => {
  return {
    card: state.card,
    nearby: state.nearby,
    coords: state.user,
    nearbyList: state.nearby.nearbyList
  };
};

FindCard = withRouter(connect( mapStateToProps, { findNearby })(FindCard));
export default FindCard;