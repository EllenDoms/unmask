import React, { Component } from 'react';
import { connect } from "react-redux";
import history from '../auth/history';

class Header extends Component {
  onClickBack() {
    history.push('/');
    window.location.reload()
  }
  render() {
    let { user }  = this.props;
    return (
      <div className='header wrapFlex'>
        <button className='left icon material-icons' onClick={() => this.onClickBack()}>
          {this.props.back ==='true' ? 'arrow_back' : ' '}
        </button>
        <h3 className='center'>{this.props.title ? this.props.title : ' '}</h3>
        <img className='right icon avatar avatarTiny' src={user.fbPhotoUrl} />
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
