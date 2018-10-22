import React, { Component } from 'react';
import { connect } from "react-redux";
import { saveGameInfo } from '../../actions';

import FooterBtn from '../../components/FooterBtn';
import Header from '../../components/Header';

class NewGame extends Component {
  render() {
    return (
      <div className='content'>
        <Header back='true' />
        <form className='container bgWhite'>
          <label>Team A</label>
          <input></input>
          <label>Team B</label>
          <input></input>
          <label>Words</label>
          <input></input>
        </form>
        <FooterBtn text="Save game" click={() => this.props.saveGameInfo()} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.general.loggedIn
  };
}

export default connect(mapStateToProps, { saveGameInfo })(NewGame);
