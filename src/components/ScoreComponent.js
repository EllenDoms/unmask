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
          <h1>Game over!</h1>
          <h2>The {winner} won!</h2>
          
        </div>
      )
    } else {
      return (
        <div id="score" className='greyBg container'>
          <div className='left'>
            <p className='numberBig'>{this.props.score.capulet}</p>
            <p className='center'>Capulets left</p>
          </div>
          <div className='middle'>vs</div>
          <div className='right'>
            <p className='numberBig'>{this.props.score.montague}</p>
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
