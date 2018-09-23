import React, { Component } from 'react';
import './style/style.css';
import { connect } from "react-redux";

import { login } from './actions'

import * as firebase from 'firebase';
import { firebaseConfig } from './config/firebase';

import Login from './screens/Login';
import Game from './screens/Game';

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.login(user)
      }
    });
  }
  render() {
    if (this.props.loggedIn == true) {
      return(
        <Game />
      )
    } else {
      return (
        <Login />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.data.loggedIn
  };
}

export default connect(mapStateToProps, { login })(App);
