import axios from 'axios';
const SERVER_URL = 'http://localhost:3007';
axios.default.withCredentials = true;

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CREATE_CARD = 'CREATE_CARD';
export const AUTHENTICATION_CHECK = 'AUTHENTICATION_CHECK';

export const authError = (error) => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const register = (username, password, confirmPassword, history) => {
  return (dispatch) => {
    if(password !== confirmPassword) {
      dispatch(authError('Please use matching passwords'));
      return;
    }
    axios.post(`${SERVER_URL}/user`, { username, password })
    .then(()=> {
      dispatch({
        type: USER_REGISTERED,
      })
      .catch(() => {
        dispatch(authError('Failed to register user'));
      });
    })
  };
};

export const createcard = (card) => {
  return (dispatch) => {
    axios.post(`${SERVER_URL}/createcard`, { card })
      .then((response) => {
        dispatch({
          type: CREATE_CARD,
        })
      })
      .catch(() => {
        dispatch(
          authError('Failed to create card')
        );
      });
  };
};
export const login = (user) => {
  return (dispatch) => {
    const { username, password } = user;
    axios.post(`${SERVER_URL}/login`, {username, password })
      .then((data) => {
        localStorage.setItem('id', data.data.id);
        dispatch({
          type: USER_AUTHENTICATED,
        });
      })
      .catch(() => {
        dispatch(authError('Incorrect username or password'));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('id');
    dispatch({
      type: USER_UNAUTHENTICATED
    });
    // axios.post(`${SERVER_URL}/logout`)
    //   .then(() => {
    //     dispatch({
    //       type: USER_UNAUTHENTICATED,
    //     });
    //   })
    //   .catch(() => {
    //     dispatch(authError('Failed to log you out'));
    //   });
  };
};


export const authenticationCheck = () => {
  return {
    type: AUTHENTICATION_CHECK
  };
};