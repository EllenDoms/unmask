import React, { Component } from 'react';

import ScoreComponent from '../../components/ScoreComponent';

export default class TooLate extends Component {
  render() {
    return (
      <div className="content">
        <div className='top container'>
          <h2 className="center">Too late!</h2>
          <p className="center">Awww {this.props.user.name}, you can't enroll this game anymore because we're already playing, but keep track of the score!</p>
        </div>
        <ScoreComponent />
      </div>
    )
  }
}
