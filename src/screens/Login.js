import React, { Component } from 'react';
import { connect } from "react-redux";
import { login } from '../actions';
import * as firebase from 'firebase';
import { provider, auth } from '../config/firebase';

import FooterBtn from '../components/FooterBtn';

class Login extends Component {
  login() {
    console.log("logging in")
    auth().signInWithPopup(provider).then(result => {
      var user = result.user;
      this.props.login(user)
    }).catch(function(error) { console.log(error) });
  }
  render() {
    return (
      <div className='content'>
        <div className='container bgWhite'>
          <h1>Montagues<div className="small">vs</div>Capulets</h1>
          <p className='center vertCent'>To play the game: use your facebook account to enroll in the game. <br/>(don’t worry, we won’t use it for evil).</p>
        </div>
        <FooterBtn text="Login with Facebook" click={() => this.login()} />
      </div>
    )

  }
}

export default connect( null, { login })(Login);
