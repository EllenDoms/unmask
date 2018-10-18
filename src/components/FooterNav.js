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
        <button id="rules" className={active === "rules" ? 'nav-item active' : 'nav-item'} onClick={() => this.props.action('rules') } >
          <div className="material-icons">list</div>
          <div className="label">Rules</div>
        </button>
        <button id="target" className={active === "target" ? 'nav-item active' : 'nav-item'} onClick={() => this.props.action('target')}>
          <div className="material-icons">my_location</div>
          <div className="label">Target</div>
        </button>
        <button id="score" className={active === "score" ? 'nav-item active' : 'nav-item'} onClick={() => this.props.action('score')}>
          <div className="material-icons">show_chart</div>
          <div className="label">Score</div>
        </button>
        <button id="die" className={active === "die" ? 'nav-item active' : 'nav-item'} onClick={() => this.props.action('die')}>
          <div className="material-icons">close</div>
          <div className="label">I died</div>
        </button>
        {this.renderAdmin()}
      </div>
    )
  }
}
