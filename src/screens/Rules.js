import React, { Component } from 'react';

const ruleItems = [
  'Keep your identity a secret.',
  'On the other tab you can find your target and a secret word.',
  'Find your target, trick him/her into saying the word.',
  'Done? You killed this person, you can tell him/her that you did.',
  'You get a new target.',
  'Watch out! Someone is hunting for you too, if you say their forbidden word, you are dead.'
]


export default class Rules extends Component {
  renderRules() {
    return(
      <div className='item'>
        <div className='number'>1</div>
        <p className='text'>bla</p>
      </div>
    )
  }
  render() {
    return (
      <div className='container'>
        {/* image */}
        <p className='center'>You are a</p>
        <h1>Capulet</h1>
        <div id='rules' className='greyBg'>
          {ruleItems.map((rule, key) => {
            let number = key +1
            return(
              <div className='item' key={key}>
                <div className='number'>{number}</div>
                <p className='text'>{rule}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
