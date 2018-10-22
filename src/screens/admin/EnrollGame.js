import React, { Component } from 'react';
import { connect } from "react-redux";
import { newGame } from '../../actions';

import FooterBtn from '../../components/FooterBtn';

class NewGame extends Component {
  render() {
    return (
      <div className='content'>

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
