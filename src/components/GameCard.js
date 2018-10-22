import React, { Component } from 'react';
import { connect } from "react-redux";
import history from '../auth/history';

class GameCard extends Component {
  onClickGame() {
    history.push('/?game=' + this.props.games[this.props.gameKey].id)
    window.location.reload()

  }
  render() {
    let { games, gameKey }  = this.props;
    let myGame = games[gameKey]
    console.log(myGame)
    return (
      <button className={myGame.playing ? 'playing card' : 'card' } onClick={() => this.onClickGame()}>
        <div className='wrapFlex'>
          <p className='accent'>{myGame.playing ? 'playing' : 'not playing'}</p>
          <p className='tag'>{myGame.role === 'admin' ? 'admin' : ''}</p>
        </div>
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
