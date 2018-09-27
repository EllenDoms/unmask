import React, { Component } from 'react';

import Loading from './Loading';

export default class Target extends Component {
  render() {
    const { user } = this.props
    const activeTarget = user.targets.find(target => {
      // success is false
      return target.success == false;
    });
    if(activeTarget) {
      return (
        <div className='container bgWhite'>
          <img className="avatar avatarBig centerImage" src={activeTarget.selfieUrl} alt='profilePicture' />
          <p className='center'>Make <b>{activeTarget.name}</b> say</p>
          <h1>{activeTarget.word}</h1>
        </div>
      )
    } else {
      return <Loading />
    }

  }
}
