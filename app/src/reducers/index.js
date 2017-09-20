import { combineReducers } from 'redux';
import AuthReducer from './auth';
import CardReducer from './card';
import UserReducer from './user';

const rootReducer = combineReducers({
  auth: AuthReducer,
  card: CardReducer,
  user: UserReducer
});

export default rootReducer;