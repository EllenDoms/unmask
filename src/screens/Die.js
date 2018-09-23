import React, { Component } from 'react';

export default class Die extends Component {
  render() {
    return (
      <div className='container bgWhite'>
        <img className="avatarSmall centerImage" src={this.props.user.fbPhotoUrl} alt='profilePicture' />
        <h1>Did you die?</h1>
        <p className='center'>Someone tricked you into saying a word and informed you that you are dead? <br/> There is no way back. So be sure before you press the button.</p>
        <button className='btn'>I died!</button>
      </div>
    )
  }
}
