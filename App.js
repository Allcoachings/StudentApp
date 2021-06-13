import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import RootReducer from './Components/Reducers'
import Main from './Components/Main'

let store = createStore(RootReducer)


class App extends React.Component {
  state = {  }
  render() {
    return (
      <Provider store={store}>
          <Main/>
      </Provider>
    );
  }
}

export default App;