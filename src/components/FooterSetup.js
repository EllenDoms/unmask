import React, { Component } from 'react';

export default class FooterNav extends Component {
  render() {
    let active = this.props.active;
    return (
      <div className="footer">
        <button id="edit" className={active === "edit" ? 'nav-item active' : 'nav-item'} onClick={() => this.props.action('edit') } >
          <div className="material-icons">edit</div>
          <div className="label">Edit</div>
        </button>
        <button id="qr" className={active === "qr" ? 'nav-item active' : 'nav-item'} onClick={() => this.props.action('qr')}>
          <div className="material-icons">image</div>
          <div className="label">Link</div>
        </button>
      </div>
    )
  }
}
