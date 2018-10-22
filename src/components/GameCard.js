import React, { Component } from 'react';
import { connect } from "react-redux";
import history from '../auth/history';

class GameCard extends Component {
  onClickGame() {
    history.push('/?game=' + this.props.games[this.props.gameKey].id)
  }
  render() {
    let { games, gameKey }  = this.props;
    let myGame = games[gameKey]
    console.log(myGame)
    return (
      <button className='card' onClick={() => this.onClickGame()}>
        <p className='accent'>{myGame.playing === true ? 'playing' : 'not playing'}</p>
        <div className='tag'>{myGame.role === 'admin' ? 'admin' : ''}</div>
        <h2>{myGame.title}</h2>
      </button>
    )
  }
}

function mapStateToProps(state) {
  return {
    games: state.general.games
  };
}

export default connect(mapStateToProps)(GameCard);
