import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const emailChanged = (text) => {
  return {
      type: 'emailChanged',
      payload: text
  };
};

export const passwordChanged = (text) => {
  return {
      type: 'passwordChanged',
      payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: 'loginUser' });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error);

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch));
      });
  };
};

// note that dispatch is being passed in so the function has access to it
const loginUserFail = (dispatch) => {
  dispatch({ type: 'loginUserFail' });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: 'loginUserSuccess',
    payload: user
  });

  // react-native-router-flux's Actions va has our employeeList on it
  // because it's set as the 'key' on the 'Scene' tag in the 'Router.js' file
  // if the scene wasn't nested we wouldn't need the 'main'
  // we'd go directly to actual key for the component
  Actions.main();
};
