import React, { Component } from 'react';
import { connect } from "react-redux";

import { startGame, stopGame } from '../actions'

class Admin extends Component {
  render() {
    if(!this.props.game) {
      // if game is false (not playing)
      return (
        <div className='content'>
          <div className='container bgWhite'>
            <div>
              <p className='center'>Players registered: </p>
              <h2>{this.props.admin.registered}</h2>
              <p className='center'>Players ready: </p>
              <h2>{this.props.admin.ready}</h2>
            </div>
            <button className='btn' onClick={() => this.props.startGame()}>Start game</button>
          </div>
        </div>
      )
    } else {
      return (
        <div className='content'>
          <div className='container bgWhite'>
            <div>
              <p className='center'>Players registered: </p>
              <h2>{this.props.admin.registered}</h2>
              <p className='center'>Players ready: </p>
              <h2>{this.props.admin.ready}</h2>
            </div>
            <button className='btn' onClick={() => this.props.stopGame()}>Stop game</button>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    game: state.data.game,
    admin: state.admin,
  };
}

export default connect(mapStateToProps, { startGame, stopGame })(Admin);
