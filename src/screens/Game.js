import React, { Component } from 'react';
import FooterNav from '../components/FooterNav';

import Rules from './Rules';
import Target from './Target';
import Score from './Score';
import Die from './Die';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { active: "rules" };
    this.setActive = this.setActive.bind(this)
  }
  renderpage(page){
    switch(page) {
      case 'rules': return <Rules />
      case 'target': return <Target />
      case 'score': return <Score />
      case 'die': return <Die />
    }
  }
  setActive(activePage) {
    this.setState({active: activePage})
  }
  render() {
    return (
      <div>
        {this.renderpage(this.state.active)}
        <FooterNav active={this.state.active} action={this.setActive} />
      </div>
    )
  }
}
