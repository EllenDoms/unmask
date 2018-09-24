import React, { Component } from 'react';
import './style/style.css';
import { connect } from "react-redux";

import { login } from './actions'
import { gameStatus } from './actions'
import { stopLoading } from './actions'

import * as firebase from 'firebase';
import { firebaseConfig } from './config/firebase';

import Loading from './screens/Loading';
import Login from './screens/Login';
import Game from './screens/Game';
import Admin from './screens/Admin';

class App extends Component {
  componentDidMount() {
    // check if logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.login(user)
      }
    });
    // check game status and stop loading
    firebase.database().ref('CodeCapulets/game').on('value', snapshot => {
      this.props.gameStatus(snapshot.val());
      this.props.stopLoading();
    });

  }
  render() {
    if(this.props.loading === true) {
      return <Loading />
    } else {
      if (this.props.loggedIn === false) {
        return <Login />
      } else {
        return <Game />
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.data.user,
    game: state.data.game,
    loggedIn: state.data.loggedIn,
    loading: state.data.loading
  };
}

export default connect(mapStateToProps, { login, gameStatus, stopLoading })(App);
