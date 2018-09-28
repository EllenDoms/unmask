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
import Admin from './screens/Admin';

class App extends Component {
  componentDidMount() {
    // listener logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (this.props.loggedIn === false && !this.props.user.id) {
        console.log(user);
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
    if(this.props.loading === true) {
      return <Loading />
    } else {
      if (this.props.loggedIn === false) {
        return <Login />
      } else if (!this.props.user.selfieUrl || this.props.user.selfieUrl === "") {
        return <Selfie />
      } else {
        return <Game />
      }
    }
  }
}

function mapStateToProps(state) {
  console.log(state.data)
  return {
    user: state.data.user,
    game: state.data.game,
    loggedIn: state.data.loggedIn,
    loading: state.data.loading,
  };
}

export default connect(mapStateToProps, { login, gameStatus, stopLoading })(App);
