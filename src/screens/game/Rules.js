import React, { Component } from 'react';

const ruleItems = [
  'Keep your family a secret.',
  'On the other tab you can find your target and a secret word.',
  'Find your target, trick him/her into saying the word.',
  'Done? You killed this person, you can tell him/her that you did.',
  'You get a new target.',
  'Watch out! Someone is hunting for you too, if you say their forbidden word, you are dead.'
]


export default class Rules extends Component {
  render() {
    return (
      <div className='content'>
        <div className='top container'>
          <img className="avatar avatarSmall centerImage" src={this.props.user.selfieUrl} alt='profilePicture' />
          <p className='center'>You are a</p>
          <h1>{this.props.user.family}</h1>
        </div>
        <div id='rules' className='container'>
          {ruleItems.map((rule, key) => {
            let number = key+1
            return(
              <div className='item' key={key}>
                <div className="left"><div className='number'>{number}</div></div>
                <div className="right"><p className='text'>{rule}</p></div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
