import React, { Component } from 'react';
import { connect } from "react-redux";
import * as firebase from 'firebase';

import { scoreStatus, logout } from '../../actions';
import ScoreComponent from '../../components/ScoreComponent';

class TooLate extends Component {
  componentDidMount() {
    // listener game status and stop loading
    firebase.database().ref('CodeCapulets/score').on('value', snapshot => {
      this.props.scoreStatus(snapshot.val());
    });
  }
  render() {
    return (
      <div className="content">
        <div className='top container'>
          <p className='center'>Too bad! You are too late to be part of the game. But you can follow up on the score here!</p>
        </div>

        <ScoreComponent />
        <div className='container'><button className='btn btnSec' onClick={() => this.props.logout()}>Logout</button></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.game.user,
    score: state.game.score,
  };
}

export default connect(mapStateToProps, { scoreStatus, logout })(TooLate);
