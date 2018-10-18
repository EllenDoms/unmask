import React, { Component } from 'react';
import './style/style.css';
import { connect } from "react-redux";

import * as firebase from 'firebase';
import { firebaseConfig } from './config/firebase';

import Selfie from './screens/enrollGame/Selfie';
import TooLate from './screens/enrollGame/TooLate';
import Enroll from './screens/enrollGame/Enroll';

class App extends Component {
  componentDidMount() {
    // Set game exists to param, or false if empty
    let params = new URLSearchParams(window.location.search);
    let gameCode = params.get('game') || '';

    if(gameCode) {
      // listener game status
      firebase.database().ref( gameCode + '/game').on('value', snapshot => {
        this.props.gameStatus(snapshot.val());
      });
    }

    // listener authentication
    firebase.auth().onAuthStateChanged(user => {
      if(user) { this.props.login(user) }
    });
  }

  render() {
    let { loading, gameExists, loggedIn, game, user }  = this.props;
    if(loading) {
      return <Loading />
    } else if(gameExists === false) {
      // Game in param doesn't exist
      return <NoGame />
    } else if(gameExists === null) {
      // No game selected = go to portal
      if(!loggedIn) {
        return <Login game='no' />
      } else {
        return <NewGame />
      }
    } else {
      // game exists
      if (!loggedIn) {
        return <Login game='yes' />
      } else if (!user.selfieUrl || user.selfieUrl === "") {
        return <Selfie />
      } else if (game && !user.enrolled) {
        return <TooLate />
      } else if(user.enrolled != true) {
        return <Enroll />
      } else {
        return <Game />
      }
    }
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    gameExists: state.general.gameExists,
    user: state.data.user,
    game: state.data.game,
    loggedIn: state.data.loggedIn,
    loading: state.general.loading
  };
}

export default connect(mapStateToProps, { setGame, login, gameStatus, stopLoading })(App);
