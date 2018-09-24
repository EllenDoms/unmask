import React, { Component } from 'react';

export default class Waiting extends Component {
  render() {
    return (
      <div className= "container bgWhite flexCenter" >
        <div className="lds-ripple"><div></div><div></div></div>
      </div>
    )
  }
}
