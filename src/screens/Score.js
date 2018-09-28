import React, { Component } from 'react';

import ScoreComponent from '../components/ScoreComponent';

export default class Score extends Component {
  render() {
    let wins = this.props.user.targets.length - 1;
    return (
      <div className="content">
        <div className='top container'>
          <img className="avatar avatarSmall centerImage" src={this.props.user.selfieUrl} alt='profilePicture' />
          <h2>{wins}</h2>
          <p className='center'>Of your targets died</p>
        </div>
        <ScoreComponent />
      </div>
    )
  }
}
