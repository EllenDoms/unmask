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
        <div>
          <Header back='false' title={'Hi, ' + user.name + '!'} />
          <div className='container bgWhite'>
            <div>add button</div>
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

export default connect(mapStateToProps)(Portal);
