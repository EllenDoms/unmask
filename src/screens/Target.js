import React, { Component } from 'react';

export default class Target extends Component {
  getTarget() {

  }
  render() {
    return (
      <div className='container bgWhite'>
        <img className="avatarBig centerImage" src={this.props.user.fbPhotoUrl} alt='profilePicture' />
        <p className='center'>Make him/her say</p>
        <h1>-Word-</h1>
      </div>
    )
  }
}
