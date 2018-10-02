import React, { Component } from 'react';
import { connect } from "react-redux";

import { startGame, stopGame } from '../actions'

class Admin extends Component {
  render() {
    if(!this.props.game) {
      // if game is false (not playing)
      console.log("not playing")
      return (
        <div className='content'>
          <div className='container bgWhite'>
            <button className='btn' onClick={() => this.props.startGame()}>Start game</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='content'>
          <div className='container bgWhite'>
            <button className='btn' onClick={() => this.props.stopGame()}>Stop game</button>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    game: state.data.game
  };
}

export default connect(mapStateToProps, { startGame, stopGame })(Admin);
