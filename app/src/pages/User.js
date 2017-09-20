import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class User extends Component {

  render() {
    return(
      <div>
        <button type='Submit'> Gps Stiff maybe????</button>
        <Link to='/createcard'> Update Card </Link>
      </div>

    )
  }
}

export default User;