import React, { Component } from 'react';
import { connect } from "react-redux";
import FooterNav from '../components/FooterNav';
import FooterSmallNav from '../components/FooterSmallNav';

import { scoreStatus, userStatus } from '../actions';

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
    // Listener user
    firebase.database().ref('CodeCapulets/people/' + this.props.user.id).on('value', snapshot => {
      console.log(snapshot.val());
      this.props.userStatus(snapshot.val());
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
    if(!this.props.game) {
      // if game = false (not started): go to waiting page
      if(!this.props.user.admin) {
        return <Waiting user={this.props.user}  />
      } else {
        return <Admin user={this.props.user} />
      }
    } else if(this.props.game && this.props.user.alive) {
      // game started and alive
      return (
        <div>
          {this.renderpage(this.state.active)}
          <FooterNav admin={this.props.user.admin} active={this.state.active} action={this.setActive} />
        </div>
      )
    } else {
      // death.
      if(!this.props.user.admin) {
        return (
          <div>
            <Score user={this.props.user} score={this.props.score} />
            {/* <FooterBtn text="Logout" onClick={() => this.logout()} /> */}
          </div>
        )
      } else {
        return (
          <div>
            {this.renderpageSmall(this.state.active)}
            <FooterSmallNav admin={this.props.user.admin} active={this.state.active} action={this.setActive} />
            {/* <FooterBtn text="Logout" onClick={() => this.logout()} /> */}
          </div>
        )
      }

    }
  }
}

function mapStateToProps(state) {
  console.log(state.data.user)
  return {
    loggedIn: state.data.loggedIn,
    user: state.data.user,
    game: state.data.game,
    score: state.data.score,
  };
}

export default connect(mapStateToProps, { scoreStatus, userStatus })(Game);
