import React, { Component } from 'react';
import './style/style.css';
import { connect } from "react-redux";

import { setGame, login, gameStatus, stopLoading } from './actions';

import * as firebase from 'firebase';
import { auth } from './config/firebase';

import Loading from './screens/Loading';
import Login from './screens/Login';
import NoGame from './screens/NoGame';
import EnrollGame from './screens/EnrollGame';
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
      console.log(user)
      this.props.login(user)
    });
  }
  componentDidUpdate() {
    console.log(this.props.user.loggedIn)
    if(this.props.gameExists !== '' && this.props.user.loggedIn !== '') {
      this.props.stopLoading()
    }
  }
  render() {
    let { loading, gameExists, game, user, userGame }  = this.props;
    if(loading) {
      return <Loading />
    } else if(gameExists === false) {
      // Game in param doesn't exist
      return <NoGame />
    } else if(gameExists === null) {
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
      } else if(userGame.enrolled !== true) {
        return <EnrollGame />
      } else {
        return <Game />
      }
    }
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    loading: state.general.loading,
    gameExists: state.general.gameExists,
    user: state.general.user,
    userGame: state.data.user,
    game: state.data.game,
  };
}

export default connect(mapStateToProps, { setGame, login, gameStatus, stopLoading })(App);
