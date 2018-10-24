import React, { Component } from 'react';
import { connect } from "react-redux";
import { getGameInfo } from '../actions';

import QR from './setup/QR';
import Edit from './setup/EditGame';

import FooterSetup from '../components/FooterSetup';
import Header from '../components/Header';

import Loading from './Loading';

class SetupGame extends Component {
  constructor(props) {
    super(props);
    this.state = { active: "edit" };
  }
  componentDidMount(){
    this.props.getGameInfo();
  }
  renderpage(page){
    switch(page) {
      case 'qr': return <QR user={this.props.user} />
      default: return <Edit user={this.props.user} />
    }
  }
  setActive = (activePage) => {
    this.setState({active: activePage})
  }
  render() {
    const { game, games, handleSubmit, user} = this.props;
    if(!game.teams) {
      return <Loading />
    } else {
      return (
        <div>
          <Header back='true' />
          {this.renderpage(this.state.active)}
          <FooterSetup admin={user.role} active={this.state.active} action={this.setActive} />
        </div>
      )
    }

  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.general.loggedIn,
    game: state.game,
    games: state.general.games,
    user: state.game.user
  };
}

export default connect(mapStateToProps, { getGameInfo }) (SetupGame)
