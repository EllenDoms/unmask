import React, { Component } from 'react';
import { connect } from "react-redux";

import { newGame } from '../actions';

import Header from '../components/Header';
import GameCard from '../components/GameCard';

class Portal extends Component {
  renderCards(playing) {
    const { user, games } = this.props;
    if(games) {
      const gamesSorted = games.sort((a, b) => {
        if (a.playing === 'yes') {
          return -1;
        }
        return 1;
      })
      console.log(gamesSorted)
      return gamesSorted.map((game, key) => {
        return <GameCard key={key} gameKey={key} />
      })
    }
  }
  render() {
    const { user } = this.props;
    if(!user.games) {
      return <button className="btn floating material-icons">add</button>
    } else {
      return (
        <div>
          <Header back='false' title={'Hi, ' + user.name + '!'} />
          <div className='container bgWhite'>
            <button className="btn floating material-icons" onClick={() => this.props.newGame()}>add</button>
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
