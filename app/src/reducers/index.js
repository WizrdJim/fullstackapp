import { combineReducers } from 'redux';
import AuthReducer from './auth';
import CardReducer from './card';

const rootReducer = combineReducers({
  auth: AuthReducer,
  card: CardReducer
});

export default rootReducer;