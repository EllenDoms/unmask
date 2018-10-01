import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import { uploadSelfie } from '../actions';

class Selfie extends Component {
  render() {
    return (
      <div className="content">
        <div className="container bgWhite">
          <h1>Hi {this.props.user.name}!</h1>
          <div className="avatar avatarSmall centerImage">
            <label className="avatarEmptyLabel">
              <input className="avatarEmpty" type="file" accept="image/*" capture onChange={(e) => this.props.uploadSelfie(e.target.files[0])} />
              <div className="material-icons">add_a_photo</div>
            </label>
          </div>
          <p className='center'>For the game, we need a picture from you with your awesome costume. So take a selfie and upload it here!</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.data.user
  };
}

export default connect(mapStateToProps, { uploadSelfie })(Selfie);
