import React, { Component } from 'react';

export default class FooterNav extends Component {
  renderAdmin() {
    let active = this.props.active;
    if(this.props.admin) {
      return(
        <button id="admin" className={active == "admin" ? 'nav-item active' : 'nav-item'} onClick={() => this.props.action('admin')}>
          <div className="material-icons">settings</div>
          <div className="label">Admin</div>
        </button>
      )
    }
  }
  render() {
    let active = this.props.active;
    return (
      <div className="footer">
        <button id="score" className={active == "score" ? 'nav-item active' : 'nav-item'} onClick={() => this.props.action('score')}>
          <div className="material-icons">show_chart</div>
          <div className="label">Score</div>
        </button>
        {this.renderAdmin()}
      </div>
    )
  }
}
