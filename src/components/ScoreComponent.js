import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { scoreStatus } from '../actions';


class ScoreComponent extends Component {
  render() {
    const { capulet, montague } = this.props.score
    if(capulet === 0 || montague === 0) {
      let winner = capulet === 0 ? "Montagues" : "Capulets";
      return (
        <div className='greyBg container center'>
          <p>Game over!</p>
          <h2>The {winner} won!</h2>

        </div>
      )
    } else {
      return (
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
      )
    }

  }
}

function mapStateToProps(state) {
  return {
    score: state.game.score,
  };
}

export default connect(mapStateToProps, { scoreStatus })(ScoreComponent);
