import React, { Component } from 'react';
import { connect } from "react-redux";

import { iDied, logout } from '../actions';

class Die extends Component {
  render() {
    const { user, score } = this.props;
    return (
      <div className='container bgWhite'>
        <img className="avatar avatarSmall centerImage" src={this.props.user.selfieUrl} alt='profilePicture' />
        <h1>Did you die?</h1>
        <p className='center'>Someone tricked you into saying a word and informed you that you are dead? <br/> There is no way back. So be sure before you press the button.</p>
        <button className='btn' onClick={() => this.props.iDied(user.id)}>I died!</button>
        <p>Or do you just want to logout?</p>
        <button className='btn' onClick={() => this.props.logout()}>Logout</button>
      </div>
    )
  }
}

export default connect(null, { iDied, logout })(Die);
