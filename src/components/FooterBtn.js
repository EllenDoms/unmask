import React, { Component } from 'react';

export default class FooterBtn extends Component {
  render() {
    return (
      <div className="footer button">
        <div className='container'>
          <button className="btn" type={this.props.type} onClick={this.props.click}>{this.props.text}</button>
        </div>
      </div>
    )
  }
}
