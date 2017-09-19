import {
  USER_AUTHENTICATED,
  USER_UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  AUTHENTICATION_CHECK
} from '../actions';

const AuthReducer = (auth = {
  authenticated: localStorage.getItem('token') ? true : false
}, action) => {
  switch (action.type) {
    case USER_AUTHENTICATED:
      return {...auth, authenticated: true};
    case USER_UNAUTHENTICATED:
      return {...auth, authenticated: false};
    case AUTHENTICATION_ERROR:
      return {...auth, errorMessage: action.payload };
    default:
      return auth;
  }
};

export default AuthReducer;