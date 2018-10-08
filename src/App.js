import React, { Component } from 'react';
import './style/style.css';
import { connect } from "react-redux";

import { setGame, login, gameStatus, stopLoading } from './actions';

import * as firebase from 'firebase';
import { firebaseConfig } from './config/firebase';

import NewGame from './screens/NewGame';
import NoGame from './screens/NoGame';
import Loading from './screens/Loading';
import Login from './screens/Login';
import Selfie from './screens/Selfie';
import Game from './screens/Game';
import TooLate from './screens/TooLate';
import Admin from './screens/Admin';
import Enroll from './screens/Enroll';

class App extends Component {
  componentDidMount() {
    // If nothing in params, new game should be made
    let params = new URLSearchParams(window.location.search);
    let gameCode = params.get('game') || '';
    console.log('Param: ', gameCode)
    if(gameCode) {
      console.log('Game exists')
      this.props.setGame(gameCode);

      // listener game status and stop loading
      firebase.database().ref( gameCode + '/game').on('value', snapshot => {
        this.props.gameStatus(snapshot.val());
        this.props.stopLoading();
      });
    }

    // listener authentication
    firebase.auth().onAuthStateChanged(user => {
      if(user) { this.props.login(user) }
    });


  }

  render() {
    let { loading, gameExists, loggedIn, game, user }  = this.props;
    if(gameExists === '') {
      // home page = make a new game.
      return <NewGame />
    } else if(gameExists === false) {
      return <NoGame />
    } else if(loading === true ) {
      return <Loading />
    } else {
      if (loggedIn === false) {
        return <Login />
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
  return {
    gameExists: state.exists.game,
    user: state.data.user,
    game: state.data.game,
    loggedIn: state.data.loggedIn,
    loading: state.data.loading,
  };
}

export default connect(mapStateToProps, { setGame, login, gameStatus, stopLoading })(App);
