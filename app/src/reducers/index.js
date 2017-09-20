import { combineReducers } from 'redux';
import AuthReducer from './auth';

const rootReducer = combineReducers({
  auth: AuthReducer,
  card: CardReducer
});

export default rootReducer;