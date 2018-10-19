import React, { Component } from 'react';
import { connect } from "react-redux";

import Header from '../components/Header';

class Portal extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>add button</div>
        {}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.general.user
  };
}

export default connect(mapStateToProps)(Portal);
