import React, { Component } from 'react';

export default class Score extends Component {
  render() {
    let wins = this.props.user.targets.length - 1;
    return (
      <div className="content">
        <div className='top container'>
          <img className="avatarSmall centerImage" src={this.props.user.fbPhotoUrl} alt='profilePicture' />
          <h2>{wins}</h2>
          <p className='center'>Wins</p>
        </div>
        <div id="score" className='greyBg container'>
          <div className='left'>
            <h2>{this.props.score.capulet}</h2>
            <p className='center'>Capulets left</p>
          </div>
          <div className='middle'>vs</div>
          <div className='right'>
            <h2>{this.props.score.montague}</h2>
            <p className='center'>Montagues left</p>
          </div>
        </div>
      </div>
    )
  }
}
