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
import Admin from './Admin';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { active: "rules" };
  }
  componentWillMount() {
    firebase.database().ref('CodeCapulets/score').on('value', snapshot => {
      this.props.scoreStatus(snapshot.val());
    });

  }
  renderpage(page){
    switch(page) {
      case 'target': return <Target user={this.props.user} />
      case 'score': return <Score user={this.props.user} score={this.props.score} />
      case 'die': return <Die user={this.props.user} />
      case 'admin': return <Admin user={this.props.user} />
      default: return <Rules user={this.props.user} />
    }
  }
  setActive = (activePage) => {
    this.setState({active: activePage})
  }
  render() {
    if(!this.props.game) {
      // if game = false (not started): go to waiting page
      if(!this.props.user.admin) {
        return <Waiting user={this.props.user}  />
      } else {
        return <Admin user={this.props.user} />
      }
    } else {
      return (
        <div>
          {this.renderpage(this.state.active)}
          <FooterNav admin={this.props.user.admin} active={this.state.active} action={this.setActive} />
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

export default connect(mapStateToProps, { scoreStatus })(Game);
