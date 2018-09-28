import React, { Component } from 'react';

import ScoreComponent from '../components/ScoreComponent';

export default class Score extends Component {
  render() {
    return (
      <div className="content">
        <div className='top container'>
          <img className="avatar avatarSmall centerImage" src={this.props.user.selfieUrl} alt='profilePicture' />
          <p className="center">{this.props.user.name}</p>
        </div>
        <ScoreComponent />
      </div>
    )
  }
}
