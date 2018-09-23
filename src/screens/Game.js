import React, { Component } from 'react';
import FooterNav from '../components/FooterNav';
import { connect } from "react-redux";

import { gameStatus } from '../actions';
import { scoreStatus } from '../actions';

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
    firebase.database().ref('CodeCapulets/game').on('value', snapshot => {
      this.props.gameStatus(snapshot.val());
    });
    firebase.database().ref('CodeCapulets/score').on('value', snapshot => {
      this.props.scoreStatus(snapshot.val());
    });

  }
  startGame() {
    // only once: start game logic
    // this.props.startGame()
  }
  renderpage(page){
    switch(page) {
      case 'target': return <Target user={this.props.user} />
      case 'score': return <Score user={this.props.user} score={this.props.score} />
      case 'die': return <Die user={this.props.user} />
      default: return <Rules user={this.props.user} />
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
    score: state.data.score,
  };
}

export default connect(mapStateToProps, { gameStatus, scoreStatus })(Game);
