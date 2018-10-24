import React, { Component } from 'react';
import { connect } from "react-redux";
import { getGameInfo, saveGameInfo } from '../../actions';
import { Field, reduxForm, FieldArray } from 'redux-form';

import FooterBtn from '../../components/FooterBtn';
import Header from '../../components/Header';

import Loading from '../Loading';

const renderField = (field) => {
  return(
    <div className='fieldWrapper'>
      <label>{field.label}</label>
      <input type='text' {...field.input} ></input>
    </div>
  )
}
const renderWordFields = ({ fields, meta: { error } }) => {
  return(
    <div className='wordsWrapper'>
      {fields.map((word, index) => {
        return(
          <div key={index} className='wordWrapper'>
            <Field name={word} type="text" component={renderField} />
            <div className='material-icons center' onClick={() => fields.remove(index)}>delete</div>
          </div>
        )
      })}
      <div className='material-icons center' onClick={() => fields.push()}>add</div>
    </div>
  )
}

class EditGame extends Component {
  componentDidMount(){
    this.props.getGameInfo();
  }
  onSubmit = (values) => {
    this.props.saveGameInfo(values);
  }
  render() {
    const { game, handleSubmit} = this.props;
    console.log(this.props.initialValues.words)
    if(!game.teams) {
      return <Loading />
    } else {
      return (
        <div className='content'>
          <form onSubmit={handleSubmit(this.onSubmit)} className='container bgWhite'>
            <Field label='Teamname 1' name='team1' component={renderField} />
            <Field label='Teamname 2' name='team2' component={renderField} />

            <label>Words</label>
            <FieldArray name='words' component={renderWordFields} />

            <button className='btn'>Save info</button>
          </form>
        </div>
      )
    }

  }
}

let InitializeFromStateForm = reduxForm({
    form: 'EditGame',
    enableReinitialize : true,
    // validate
})(EditGame);

function mapStateToProps(state) {
  console.log(state)
  return {
    game: state.game,
    initialValues: {
      team1: state.game.teams[0],
      team2: state.game.teams[1],
      words: state.game.words
    }
  }
}

export default connect(mapStateToProps, { getGameInfo, saveGameInfo }) (InitializeFromStateForm)
