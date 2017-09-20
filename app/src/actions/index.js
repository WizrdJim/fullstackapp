import axios from 'axios';
const SERVER_URL = 'http://localhost:3007';
axios.default.withCredentials = true;

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CARD_UPDATE = 'CARD_UPDATE';
export const AUTHENTICATION_CHECK = 'AUTHENTICATION_CHECK';

export const authError = (error) => {
  return {
    type: AUTHENTICATION_ERROR,
    payload: error
  };
};

export const register = (user, history) => {
  const {username, password, confirmPassword} = user;
  return (dispatch) => {
    if(password !== confirmPassword) {
      dispatch(authError('Please use matching passwords'));
      return;
    }
    axios.post(`${SERVER_URL}/user`, { username, password })
    .then((data)=> {
      localStorage.setItem('id', data.data.id);
      //Stores the card id in the local storage
      //ideally everything would go through redux!
      localStorage.setItem('cardId', data.data.bCard);
      dispatch({
        type: USER_AUTHENTICATED,
      })
      history.push('./createcard')
    })
    .catch(() => {
      dispatch(authError('Failed to register user'));
    });
  };
};

export const updateCard = (card) => {
  return (dispatch) => {
    axios.put(`${SERVER_URL}/card`, { card })
      .then((response) => {
        dispatch({
          type: CARD_UPDATE,
          payload: card
        })
      })
      .catch(() => {
        dispatch(
          authError('Failed to create card')
        );
      });
  };
};
export const login = (user, history) => {
  return (dispatch) => {
    const { username, password } = user;
    axios.post(`${SERVER_URL}/login`, {username, password })
      .then((data) => {
        localStorage.setItem('id', data.data.id);
        //Stores the card id in the local storage
        //ideally everything would go through redux!
        localStorage.setItem('cardId', data.data.bCard);
        dispatch({
          type: USER_AUTHENTICATED,
        });
        if(!history) {
          console.log('somethings not connecting');
        }
        history.push('/createcard');
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