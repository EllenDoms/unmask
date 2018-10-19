import React, { Component } from 'react';
import { connect } from "react-redux";

class Header extends Component {
  render() {
    let { user }  = this.props;
    return (
      <div className='card'>
        <p className='accent'>Playing</p>
        <div className='tag'>admin</div>
        <h2>Title of game</h2>
        <p>10 registered</p>
        <p>10 enrolled</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.general.user,
  };
}

export default connect(mapStateToProps)(Header);
