import React, { Component } from "react";
import { connect } from "react-redux";
import FooterNav from '../components/FooterNav';
import FooterSmallNav from '../components/FooterSmallNav';

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
    // listener Score
    firebase.database().ref('CodeCapulets/score').on('value', snapshot => {
      this.props.scoreStatus(snapshot.val());
    });
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
    let { game, user, score } = this.props

    if(!game) {
      // if game = false (not started): go to waiting page
      if(!user.admin) {
        return <Waiting user={user}  />
      } else {
        return <Admin user={user} />
      }
    } else if(game) {
      // game started
      if(!user.admin) {
        if(user.alive && score.capulet != 0 && score.montague != 0) {
          return (
            <div>
              {this.renderpage(this.state.active)}
              <FooterNav admin={user.admin} active={this.state.active} action={this.setActive} />
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
              <FooterSmallNav admin={this.props.user.admin} active={this.state.active} action={this.setActive} />
            </div>
          )

        } else {
          return (
            <div>
              {this.renderpage(this.state.active)}
              <FooterNav admin={user.admin} active={this.state.active} action={this.setActive} />
            </div>
          )
        }
      }
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
