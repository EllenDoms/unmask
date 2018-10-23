import React, { Component } from 'react';
import { connect } from "react-redux";

import { startGame, stopGame } from '../actions';

import Header from '../components/Header';
import NewGame from './admin/NewGame';
import EnrollGame from './EnrollGame';
import QR from './admin/QR';

class Admin extends Component {
  render() {
    const { playing, user } = this.props
    if(playing === 'setup') {
      return <NewGame />
    } else if(playing === 'not playing') {
      return <QR />
    } else if(playing === 'enroll') {
      // if people can enroll, you have to enroll yourself!
      if(user.enrolled !== true) {
        return <EnrollGame />
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
              <button className='btn' onClick={() => this.props.startGame()}>Start game</button>
            </div>
          </div>
        )
      }
    } else {
      // we're playing!
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
    user: state.game.user
  };
}

export default connect(mapStateToProps, { startGame, stopGame })(Admin);
