import React, { Component } from 'react';
import { connect } from "react-redux";

class Header extends Component {
  render() {
    let { user }  = this.props;
    return (
      <div className='header'>
        <h3 className='center'>Hi {user.name}!</h3>
        <img className='profile' src={user.fbPhotoUrl} />
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
