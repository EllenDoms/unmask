import React, { Component } from 'react';

export default class Target extends Component {
  render() {
    const { user } = this.props
    const activeTarget = user.targets.find(target => {
      // success is false
      return target.success == false;
    });
    console.log(activeTarget)
    return (
      <div className='container bgWhite'>
        <img className="avatarBig centerImage" src={activeTarget.fbPhotoUrl} alt='profilePicture' />
        <p className='center'>Make him/her say</p>
        <h1>{activeTarget.word}</h1>
      </div>
    )
  }
}
