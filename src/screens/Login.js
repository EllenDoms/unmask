import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import * as firebase from 'firebase';
import { firebaseConfig } from '../config/firebase';

import { login } from '../actions'
import FooterBtn from '../components/FooterBtn';

class Login extends Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.login(user)
      }
    });
  }
  login() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
  }
  render() {
    if (this.props.loggedIn) {
      return(
        <Redirect to="/game" />
      )
    } else {
      return (
        <div>
          <h1>Montagues<div className="small">vs</div>Capulets</h1>
          <p>To play the game: give the password and use your facebook account to login (don’t worry, we won’t use it for evil).</p>
          <FooterBtn text="Login with Facebook" onClick={() => this.login()} />
        </div>
      )
    }

  }
}

function mapStateToProps(state) {
  console.log(state.data.loggedIn)
  return {
    loggedIn: state.data.loggedIn
  };
}

export default connect(mapStateToProps, { login })(Login);
