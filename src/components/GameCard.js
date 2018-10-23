import React, { Component } from 'react';
import { connect } from "react-redux";
import history from '../auth/history';

class GameCard extends Component {
  onClickGame() {
    history.push('/?game=' + this.props.games[this.props.gameKey].id)
    window.location.reload()
  }
  adminTag(myGame) {
    if(myGame.role === 'admin') {
      return <p className='tag small'>admin</p>;
    }
  }
  render() {
    let { games, gameKey }  = this.props;
    let myGame = games[gameKey];
    return (
      <button className={myGame.playing === 'playing' ? 'playing card' : 'card' } onClick={() => this.onClickGame()}>
        <div className='wrapFlex'>
          <p className='accent'>{myGame.playing}</p>
          {this.adminTag(myGame)}
        </div>
        <h2>{myGame.teams[0] + ' vs ' + myGame.teams[1]}</h2>
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
