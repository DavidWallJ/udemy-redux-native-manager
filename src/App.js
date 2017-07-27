import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyAO7nCcQE0uaYP2PE2wbGvXU8AAiDNYyLo',
      authDomain: 'udemy-redux-native-manager.firebaseapp.com',
      databaseURL: 'https://udemy-redux-native-manager.firebaseio.com',
      projectId: 'udemy-redux-native-manager',
      storageBucket: '',
      messagingSenderId: '353527900259'
    };

    firebase.initializeApp(config);
  }
  render() {
    // the {} argument could contain default state
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
  }
}

export default App;
