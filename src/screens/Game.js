import React, { Component } from "react";
import { connect } from "react-redux";
import FooterNav from '../components/FooterNav';
import FooterSmallNav from '../components/FooterSmallNav';

import { scoreStatus, gameStatus } from '../actions';

import * as firebase from 'firebase';

import Header from '../components/Header';
import Waiting from './game/Waiting';
import Rules from './game/Rules';
import Target from './game/Target';
import Score from './game/Score';
import Die from './game/Die';
import Admin from './Admin';
import NoGame from './NoGame';
import EnrollGame from './EnrollGame';
import NewGame from './admin/NewGame';

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
    if(playing === 'setup' && user.role ==='admin') {
      return <NewGame />
    } else if(playing === 'enroll') {
      // if playing = enroll (not started): go to waiting page
      if(user.role === 'team') {
        if(user.enrolled !== true) {
          return <EnrollGame />
        } else {
          return <Waiting user={user}  />
        }
      } else {
        return (
          <div>
            <Header back='true' />
            <Admin user={user} />
          </div>
        )
      }
    } else if(playing === 'playing') {
      // game started
      if(user.role === 'team') {
        if(user.alive && score.capulet !== 0 && score.montague !== 0) {
          return (
            <div>
              <Header back='true' />
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
              <Header back='true' />
              {this.renderpageSmall(this.state.active)}
              <FooterSmallNav role={this.props.user.role} active={this.state.active} action={this.setActive} />
            </div>
          )
        } else {
          return (
            <div>
              <Header back='true' />
              {this.renderpage(this.state.active)}
              <FooterNav role={user.role} active={this.state.active} action={this.setActive} />
            </div>
          )
        }
      }
    } else {
      // playing === not playing
      if(user.role === 'team') {
        return <NoGame />
      } else {
        //admin
        return (
          <div>
            <Header back='true' />
            <Admin user={user} />
          </div>
        )
      }
    }
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    gameExists: state.general.gameExists,
    user: state.game.user,
    playing: state.game.playing,
    score: state.game.score,
  };
}

export default connect(mapStateToProps, { scoreStatus, gameStatus })(Game);
