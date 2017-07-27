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
};
