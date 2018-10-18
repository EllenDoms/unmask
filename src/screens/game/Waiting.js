import React, { Component } from 'react';

export default class Waiting extends Component {
  render() {
    return (
      <div className= "container bgWhite" >
        <img className="avatar avatarSmall centerImage" src={this.props.user.selfieUrl} alt='profilePicture' />
        <h1>All set!</h1>
        <p className="center">Now we wait for the rest to enroll. You will get a sign when the game starts.</p>
      </div>
    )
  }
}
