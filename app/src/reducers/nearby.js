import { NEARBY_USERS } from '../actions';

const NearbyReducer = (near = {}, action) => {
  switch(action.type){
    case NEARBY_USERS:
      return Object.assign(near, {
        nearbylist: action.payload
      })
    default:
      return near
  }
}

export default NearbyReducer;