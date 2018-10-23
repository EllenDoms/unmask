import React, { Component } from 'react';
import './style/style.css';
import { connect } from "react-redux";

import { setGame, login, gameStatus, stopLoading, getGames } from './actions';

import * as firebase from 'firebase';
import { auth } from './config/firebase';

import Loading from './screens/Loading';
import Login from './screens/Login';
import NoGame from './screens/NoGame';
import Game from './screens/Game';
import Portal from './screens/Portal';

class App extends Component {
  componentDidMount() {
    // Set game exists to param, or false if empty
    let params = new URLSearchParams(window.location.search);
    let gameCode = params.get('game') || '';
    this.props.setGame(gameCode);

    // listener authentication
    auth().onAuthStateChanged(user => {
      this.props.login(user)
    });
  }
  componentDidUpdate() {
    let { gameExists, user, games, game }  = this.props;
    if(gameExists && user.loggedIn !== '' && user.games !== '' ) {
      this.props.stopLoading()
    }
    if(user.games && !games) {
      this.props.getGames(user.games);
    }
  }
  render() {
    let { loading, gameExists, user, userGame }  = this.props;
    if(loading) {
      return <Loading />
    } else if(gameExists === false) {
      // Game in param doesn't exist
      return <NoGame />
    } else if(gameExists === 'noGame') {
      // No game selected = go to portal
      if(!user.loggedIn) {
        return <Login game='no' />
      } else {
        return <Portal />
      }
    } else {
      // game exists
      if (!user.loggedIn) {
        return <Login game='yes' />
      } else {
        return <Game />
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    loading: state.general.loading,
    gameExists: state.general.gameExists,
    user: state.general.user,
    games: state.general.games,
    userGame: state.game.user,
    game: state.game,

  };
}

export default connect(mapStateToProps, { setGame, login, gameStatus, stopLoading, getGames })(App);
