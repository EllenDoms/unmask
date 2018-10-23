import React, { Component } from 'react';
import { connect } from "react-redux";
import { getGameInfo, saveGameInfo } from '../../actions';

import FooterBtn from '../../components/FooterBtn';
import Header from '../../components/Header';

import Loading from '../Loading';

class NewGame extends Component {
  componentDidMount(){
    this.props.getGameInfo();
  }
  loadWords(){
    const { game, games} = this.props;
  }
  render() {
    const { game, games} = this.props;
    if(!game.teams) {
      return <Loading />
    } else {
      return (
        <div className='content'>
          <Header back='true' />
          <form className='container bgWhite'>
            <label>Teamname 1</label>
            <input placeholder={game.teams[0]}></input>
            <label>Teamname 2</label>
            <input placeholder={game.teams[1]}></input>
            <label>Words</label>
            {/* {this.loadWords()} */}
          </form>
          <FooterBtn text="Save game" click={() => this.props.saveGameInfo()} />
        </div>
      )
    }

  }
}

function mapStateToProps(state) {
  console.log(state.game)
  return {
    loggedIn: state.general.loggedIn,
    game: state.game,
    games: state.general.games
  };
}

export default connect(mapStateToProps, { getGameInfo, saveGameInfo })(NewGame);
