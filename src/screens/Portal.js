import React, { Component } from 'react';
import { connect } from "react-redux";

import { newGame } from '../actions';

import Header from '../components/Header';
import GameCard from '../components/GameCard';

class Portal extends Component {
  renderCards(playing) {
    const { user, games } = this.props;
    if(games) {
      console.log(games)

      const gamesSorted = games.sort().reverse()
      return gamesSorted.map((game, key) => {
        return <GameCard key={key} gameKey={key} />
      })
    }
  }
  render() {
    const { user } = this.props;
    if(!user.games) {
      return <button>add game</button>
    } else {
      return (
        <div>
          <Header back='false' title={'Hi, ' + user.name + '!'} />
          <div className='container bgWhite'>
            <button onClick={() => this.props.newGame()}>add game</button>
            {this.renderCards()}
          </div>
        </div>

      )
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.general.user,
    games: state.general.games
  };
}

export default connect(mapStateToProps, {newGame})(Portal);
