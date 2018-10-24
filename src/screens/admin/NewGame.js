import React, { Component } from 'react';
import { connect } from "react-redux";
import { getGameInfo, saveGameInfo } from '../../actions';
import { Field, reduxForm } from 'redux-form';

import FooterBtn from '../../components/FooterBtn';
import Header from '../../components/Header';

import Loading from '../Loading';

class NewGame extends Component {
  componentDidMount(){
    this.props.getGameInfo();
  }
  renderField(field) {
    return (
      <div>
        <label>{field.label}</label>
        <input type={field.type} {...field.input} ></input>
      </div>
    )
  }
  loadWords(){
    const { game, games} = this.props;
  }
  onSubmit = (values) => {
    console.log(values);
    this.props.saveGameInfo(values);
  }
  render() {
    const { game, games, handleSubmit} = this.props;
    if(!game.teams) {
      return <Loading />
    } else {
      return (
        <div className='content'>
          <Header back='true' />
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <div className='container bgWhite'>
              <Field label='Teamname 1' name='team1' type="text" component={this.renderField} />
              <Field label='Teamname 2' name='team2' type="text" component={this.renderField} />
              <label>Words</label>
              {/* {this.loadWords()} */}
            </div>
            <FooterBtn text="Save game" type='submit' />
          </form>
        </div>
      )
    }

  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.general.loggedIn,
    game: state.game,
    games: state.general.games
  };
}

export default reduxForm({
  form: 'NewGame',
  initialValues: { team1: "Phone" }
})(
  connect(mapStateToProps, { getGameInfo, saveGameInfo }) (NewGame)
);
