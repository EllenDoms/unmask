import React, { Component } from 'react';
import FooterNav from '../components/FooterNav';
import { connect } from "react-redux";

import { gameStatus } from '../actions';

import * as firebase from 'firebase';

import Waiting from './Waiting';
import Rules from './Rules';
import Target from './Target';
import Score from './Score';
import Die from './Die';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { active: "rules" };
  }
  componentWillMount() {
    var gameStatus = firebase.database().ref('CodeCapulets/game');
    gameStatus.on('value', snapshot => {
      this.props.gameStatus(snapshot.val());
    });

  }
  startGame() {
    // only once: start game logic
    // this.props.startGame()
  }
  renderpage(page){
    switch(page) {
      case 'target': return <Target props={this.props.user} />
      case 'score': return <Score props={this.props.user} />
      case 'die': return <Die props={this.props.user} />
      default: return <Rules props={this.props.user} />
    }
  }
  setActive = (activePage) => {
    this.setState({active: activePage})
  }
  render() {
    if(this.props.game == false) {
      // if game = false (not started): go to waiting page
      return (
        <Waiting />
      )
    } else {
      this.startGame()
      return (
        <div>
          {this.renderpage(this.state.active)}
          <FooterNav active={this.state.active} action={this.setActive} />
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.data.loggedIn,
    user: state.data.user,
    game: state.data.game,
  };
}

export default connect(mapStateToProps, { gameStatus })(Game);
