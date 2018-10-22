import React, { Component } from "react";
import { connect } from "react-redux";
import FooterNav from '../components/FooterNav';
import FooterSmallNav from '../components/FooterSmallNav';

import { scoreStatus, gameStatus } from '../actions';

import * as firebase from 'firebase';

import Waiting from './game/Waiting';
import Rules from './game/Rules';
import Target from './game/Target';
import Score from './game/Score';
import Die from './game/Die';
import Admin from './game/Admin';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { active: "rules" };
  }
  componentWillMount() {
    const gameCode = this.props.gameExists
    // listener Score
    firebase.database().ref('games/' + gameCode + '/score').on('value', snapshot => {
      this.props.scoreStatus(snapshot.val());
    });

    if(gameCode) {
      // listener game status
      firebase.database().ref( 'games/' + gameCode + '/playing').on('value', snapshot => {
        this.props.gameStatus(snapshot.val());
      });
    }
  }
  renderpage(page){
    switch(page) {
      case 'target': return <Target user={this.props.user} />
      case 'score': return <Score user={this.props.user} score={this.props.score} />
      case 'die': return <Die user={this.props.user} score={this.props.score} />
      case 'admin': return <Admin user={this.props.user} />
      default: return <Rules user={this.props.user} />
    }
  }
  renderpageSmall(page){
    switch(page) {
      case 'score': return <Score user={this.props.user} score={this.props.score} />
      default: return <Admin user={this.props.user} />
    }
  }
  setActive = (activePage) => {
    this.setState({active: activePage})
  }
  render() {
    let { playing, user, score } = this.props
    if(!playing) {
      // if playing = false (not started): go to waiting page
      if(user.role === 'team') {
        return <Waiting user={user}  />
      } else {
        return <Admin user={user} />
      }
    } else if(playing) {
      // game started
      if(user.role === 'team') {
        if(user.alive && score.capulet !== 0 && score.montague !== 0) {
          return (
            <div>
              {this.renderpage(this.state.active)}
              <FooterNav admin={user.role} active={this.state.active} action={this.setActive} />
            </div>
          )
        } else {
          return(
            <div>
              <Score user={user} score={score} />
            </div>
          )
        }
      } else {
        // admin
        if(!user.alive || score.capulet === 0 || score.montague === 0) {
          return (
            <div>
              {this.renderpageSmall(this.state.active)}
              <FooterSmallNav role={this.props.user.role} active={this.state.active} action={this.setActive} />
            </div>
          )
        } else {
          return (
            <div>
              {this.renderpage(this.state.active)}
              <FooterNav role={user.role} active={this.state.active} action={this.setActive} />
            </div>
          )
        }
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    gameExists: state.general.gameExists,
    user: state.game.user,
    playing: state.game.playing,
    score: state.game.score,
  };
}

export default connect(mapStateToProps, { scoreStatus, gameStatus })(Game);
