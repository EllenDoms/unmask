import React, { Component } from 'react';

export default class Target extends Component {
  getTarget() {

  }
  render() {
    return (
      <div>
        <img className="avatarSmall centerImage" src={this.props.props.fbPhotoUrl} alt='profilePicture' />
        <p className='center'>Make him/her say</p>
        <h1>-Word-</h1>
      </div>
    )
  }
}
