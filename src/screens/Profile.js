import React, { Component } from 'react';
import { connect } from "react-redux";

import { logout } from '../../actions';

class Die extends Component {
  render() {
    return (
      <div className='container bgWhite'>
        <button className='btn btnSec' onClick={() => this.props.logout()}>Logout</button>
      </div>
    )
  }
}

export default connect(null, { logout })(Die);
