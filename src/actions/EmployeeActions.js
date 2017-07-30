import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: 'employeeUpdate',
    // this is es6; these are key: value pairs
    payload: { prop, value }
  };
};

export const employeeCreate = ({ name, phone, shift }) => {
  // firebase.auth().currentUser.uid gives us our current user's uid
  const { currentUser } = firebase.auth();
  // this will use redux thunk because we are returning a function
  return (dispatch) => {
  // this is a path through our json data structure
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
    .then(() => {
      // this action really just triggers a refresh since the Actions.employeeList doesn't
      dispatch({ type: 'employeeCreate' });
      // passing type: 'reset' to Actions.employeeList makes it so
      // the navigation forgets that we have just come from another screen
      // thus, no back arrow in the navigation bar
      Actions.employeeList({ type: 'reset' });
    });
  };
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
    // when ever we get value from ref give us an object that describes the content
    // NOT the actual data.  Use val() to get actual data.
    // .on will continue to run; whenever our db is updated it will dispatch the action below
      .on('value', snapshot => {
        dispatch({ type: 'employeesFetchSuccess', payload: snapshot.val() });
      });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        // this action really just triggers a refresh since the Actions.employeeList doesn't
        dispatch({ type: 'employeeSaveSuccess' });
        // reset makes it so that there is no back button
        Actions.employeeList({ type: 'reset' });
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  // we don't need to dispatch an action below to trigger the employee list to update
  // because of the way the list is populated it automatically updates
  // if there is a change to the db
  // this occurs in employeesFetch just prior to the dispatch
  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        Actions.employeeList({ type: 'reset' });
      });
  };
};
