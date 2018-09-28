import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { registerGame } from '../actions';
import FooterBtn from '../components/FooterBtn';

class RegisterGame extends Component {
  componentDidMount() {
    // listener enrolled?
    firebase.auth().onAuthStateChanged((user) => {
      if (this.props.loggedIn === false && !this.props.user.id) {
        console.log(user);
        this.props.login(user)
      }
    });
  }
  render() {
    return (
      <div className="content">
        <div className="container bgWhite">
          <h1>Hi {this.props.user.name}!</h1>
          <img className="avatar avatarSmall centerImage" src={this.props.user.selfieUrl} alt='profilePicture' />
          <p className="center">So exciting!<br />You're not enrolled just yet... But be carefull, after this page: There is NO way back... <br/> Let the games begin and may the odds be ever in your favor.</p>
        </div>
        <FooterBtn text="Enroll!" click={() => this.props.registerGame()} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state.data.user)
  return {
    user: state.data.user
  };
}

export default connect(mapStateToProps, { registerGame })(RegisterGame);
