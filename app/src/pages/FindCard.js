import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from '../components/Card';

/*
****The find card component displays the data of nearby cards
****It allows you to tap on cards and connect or save more for later

*/
class FindCard extends Component {
  constructor(props) {
    super()
    this.state = {
    }
  }
  render() {
    return(
      <div>
        <Card name = {this.props.card.name} title = {this.props.card.title} link = {this.props.card.link}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    card: state.card
  };
};

FindCard = withRouter(connect( mapStateToProps)(FindCard))
export default FindCard;