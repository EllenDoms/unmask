import React, { Component } from 'react';
import './style/style.css';
import { connect } from "react-redux";

import { login, gameStatus, stopLoading } from './actions';

import * as firebase from 'firebase';
import { firebaseConfig } from './config/firebase';

import Loading from './screens/Loading';
import Login from './screens/Login';
import Selfie from './screens/Selfie';
import Game from './screens/Game';
import TooLate from './screens/TooLate';
import Admin from './screens/Admin';
import RegisterGame from './screens/RegisterGame';

class App extends Component {
  componentDidMount() {
    // listener logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (!this.props.loggedIn && !this.props.user.id) {
        this.props.login(user)
      }
    });
    // listener game status and stop loading
    firebase.database().ref('CodeCapulets/game').on('value', snapshot => {
      this.props.gameStatus(snapshot.val());
      this.props.stopLoading();
    });
  }
  render() {
    let { loading, loggedIn, game, user }  = this.props
    if(loading === true) {
      return <Loading />
    } else {
      if (loggedIn === false) {
        return <Login />
      } else if (!user.selfieUrl || user.selfieUrl === "") {
        return <Selfie />
      } else if (game && !user.enrolled) {
        return <TooLate />
      } else if(user.enrolled != true) {
        return <RegisterGame />
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
    loading: state.data.loading,
  };
}

export default connect(mapStateToProps, { login, gameStatus, stopLoading })(App);
