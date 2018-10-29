import React, { Component } from 'react';

export default class Waiting extends Component {
  render() {
    return (
      <div className= "container bgWhite flexCenter" >
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
      </div>
    )
  }
}
