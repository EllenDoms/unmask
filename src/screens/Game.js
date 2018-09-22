import React, { Component } from 'react';
import FooterNav from '../components/FooterNav';
import { connect } from "react-redux";
import { login } from '../actions'

import * as firebase from 'firebase';
import { firebaseConfig } from '../config/firebase';

import Rules from './Rules';
import Target from './Target';
import Score from './Score';
import Die from './Die';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { active: "rules" };
    this.setActive = this.setActive.bind(this)
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.props.login(user)
      }
    });
  }
  renderpage(page){
    switch(page) {
      case 'rules': return <Rules props={this.props.user} />
      case 'target': return <Target props={this.props.user} />
      case 'score': return <Score props={this.props.user} />
      case 'die': return <Die props={this.props.user} />
    }
  }
  setActive(activePage) {
    this.setState({active: activePage})
  }
  render() {
    // if game = false (not started): go to waiting page
    return (
      <div>
        {this.renderpage(this.state.active)}
        <FooterNav active={this.state.active} action={this.setActive} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state.data.user)
  return {
    loggedIn: state.data.loggedIn,
    user: state.data.user
  };
}

export default connect(mapStateToProps, {login})(Game);
