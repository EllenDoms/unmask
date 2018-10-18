import React, { Component } from 'react';
import { connect } from "react-redux";
import { newGame } from '../../actions';

import FooterBtn from '../../components/FooterBtn';

class NewGame extends Component {
  render() {
    console.log('Logged in: ', this.props.loggedIn)
    return (
      <div className='content'>
        <div className='container bgWhite'>
          <h1>Montagues<div className="small">vs</div>Capulets</h1>
          <p className='center vertCent'>Party game for a bigger group of people. Divided in two teams you have to try to eliminate the other team by tricking them into saying a secret word.
            <br/>Start a new game as the administrator with the button below.</p>
        </div>
        {/* If not logged in: login + new game */}
        <FooterBtn text="Login with Facebook and add game" click={() => this.props.newGame()} />
        {/* If logged in: new game */}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.data.loggedIn
  };
}

export default connect(mapStateToProps, { newGame })(NewGame);
