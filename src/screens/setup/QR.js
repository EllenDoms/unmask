import React, { Component } from 'react';
import { connect } from "react-redux";
import { startEnroll } from '../../actions';

import FooterBtn from '../../components/FooterBtn';
import Header from '../../components/Header';

class QR extends Component {
  render() {
    return (
      <div className='content'>
        <div className='container bgWhite'>
          <p>Link: https://unmask-50759.firebaseapp.com?game={this.props.gameExists} </p>
          <button className='btn' onClick={() => this.props.startEnroll()} >Start enrolling people!</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    gameExists: state.general.gameExists
  };
}

export default connect(mapStateToProps, { startEnroll })(QR);
