import React, { Component } from 'react';

export default class Waiting extends Component {
  render() {
    return (
      <div className= "container bgWhite flexCenter" >
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    )
  }
}
