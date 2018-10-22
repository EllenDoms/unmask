import React, { Component } from 'react';
import { connect } from "react-redux";

import { getGames } from '../actions';

import Header from '../components/Header';
import GameCard from '../components/GameCard';

class Portal extends Component {
  renderCards() {
    const { user, games } = this.props;
    if(games) {
      const gamesArray = Object.keys(games);
      return gamesArray.map((game, key) => {
        return <GameCard key={key} gameKey={key} />
      })
    }
  }
  render() {
    const { user } = this.props;
    if(!user.games) {
      return (<div>add button</div>)
    } else {
      return (
        <div className='container bgWhite'>
          <Header />
          <div>add button</div>
          {this.renderCards()}
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

export default connect(mapStateToProps)(Portal);
