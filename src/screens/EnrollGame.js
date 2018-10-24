import React, { Component } from 'react';
import '../style/style.css';
import { connect } from "react-redux";

import * as firebase from 'firebase';
import { firebaseConfig } from '../config/firebase';

import Selfie from './enrollGame/Selfie';
import TooLate from './enrollGame/TooLate';
import Enroll from './enrollGame/Enroll';

class EnrollGame extends Component {
  render() {
    let { loading, gameExists, loggedIn, game, user }  = this.props;

    if (!user.selfieUrl || user.selfieUrl === "") {
      return <Selfie />
    } else if (game && !user.enrolled) {
      return <TooLate />
    } else if(user.enrolled != true) {
      return <Enroll />
    }
  }
}

function mapStateToProps(state) {
  return {
    gameExists: state.general.gameExists,
    user: state.game.user,
    game: state.game.game,
    loggedIn: state.game.loggedIn,
    loading: state.general.loading
  };
}

export default connect(mapStateToProps)(EnrollGame);
