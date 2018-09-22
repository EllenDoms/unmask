import React, { Component } from 'react';

export default class FooterBtn extends Component {
  render() {
    return (
      <div className="footer">
        <button className="btn" onClick={this.props.onClick}>{this.props.text}</button>
      </div>
    )
  }
}
