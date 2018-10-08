import React, { Component } from 'react';
import { connect } from "react-redux";
import * as firebase from 'firebase';

import FooterBtn from '../components/FooterBtn';

class Login extends Component {
  login() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(function(result) {
      var user = result.user;
      this.props.login(user)
    }).catch(function(error) {
      console.log(error)
    });
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

function mapStateToProps(state) {
  return {
    loggedIn: state.data.loggedIn
  };
}

export default connect(mapStateToProps)(Login);
