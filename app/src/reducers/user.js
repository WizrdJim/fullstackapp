import { GET_LOCATION } from '../actions';
const INIT_STATE = {
  coords: {
    latitude: 0,
    longitude: 0
  }
}

const UserReducer = (state = INIT_STATE, action) => {
  switch(action.type) {
  case GET_LOCATION:
    console.log(action.payload)
    return action.payload;
  default:
    return state
  }
}

export default UserReducer;