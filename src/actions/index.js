import firebase from 'firebase';

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
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({ type: 'loginUserSuccess', payload: user });
      });
  };
};
