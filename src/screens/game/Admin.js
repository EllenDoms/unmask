import React, { Component } from 'react';
import { connect } from "react-redux";

import { startGame, stopGame } from '../../actions'

class Admin extends Component {
  render() {
    if(!this.props.playing) {
      // if game is false (not playing)
      return (
        <div className='content'>
          <div className='container bgWhite'>
            <div id="score">
              <div className='left'>
                <p className='numberBig'>{this.props.admin.registered}</p>
                <p className='center'>Players registered</p>
              </div>
              <div className='right'>
                <p className='numberBig'>{this.props.admin.ready}</p>
                <p className='center'>Players ready</p>
              </div>
            </div>
            <button className='btn' onClick={() => this.props.startGame()}>Start game</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='content'>
          <div className='container bgWhite'>
            <div id="score">
              <div className='left'>
                <p className='numberBig'>{this.props.admin.registered}</p>
                <p className='center'>Players registered</p>
              </div>
              <div className='right'>
                <p className='numberBig'>{this.props.admin.ready}</p>
                <p className='center'>Players ready</p>
              </div>
            </div>
            <button className='btn' onClick={() => this.props.stopGame()}>Stop game</button>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    playing: state.game.playing,
    admin: state.admin,
  };
}

export default connect(mapStateToProps, { startGame, stopGame })(Admin);
