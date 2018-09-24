import { LOGIN_USER, LOADING, GAME_STATUS, SCORE_STATUS } from './types.js';
import * as firebase from "firebase";

export const login = (user) => (dispatch, ownProps) => {
  let params = {
    id: user.uid,
    admin: false,
    fbPhotoUrl: user.photoURL,
    name: user.displayName,
    family: '',
    alive: true,
    targets: [
      {uid: user.uid,
      word: '',
      success: false
      }
    ],
  }
  firebase.database().ref('/CodeCapulets/people/' + user.uid).once('value')
  .then(function(snapshot) {
    if (snapshot.val() !== null) {
      dispatch({
        type: LOGIN_USER,
        user: snapshot.val(),
        loggedIn: true,
      });
    } else {
      firebase.database().ref('/CodeCapulets/people/' + user.uid).update(params);
      dispatch({
        type: LOGIN_USER,
        user: params,
        loggedIn: true,
      });
    }
  })
};

export function stopLoading() {
  return function(dispatch) {
    dispatch({
      type: LOADING,
      payload: false
    });
  }
}

export function gameStatus(status) {
  return function(dispatch) {
    dispatch({ type: GAME_STATUS, payload: status });
  }
}

export function startGame(start) {
  return function(dispatch) {
    // Assign to a family
    firebase.database().ref('/CodeCapulets/').once('value').then(function(snapshot) {
      const peopleData = snapshot.val().people;
      const wordsData = snapshot.val().words;

      // convert stupid firebase objects to normal array
      const peopleArray = Object.keys(peopleData).map((key) => peopleData[key])
      const wordsArray = Object.keys(wordsData).map((key) => wordsData[key])

      // randomize array with people
      const randArray = peopleArray.sort((a, b) => {return 0.5 - Math.random()});
      let capuletsScore = 0;
      let montaguesScore = 0;
      for(let i = 0; i < randArray.length; i++) {
        let selectedID = randArray[i].id;
        let target = {
          success: false,
          uid: '',
          word: '',
          fbPhotoUrl: ''
        }

        // even and odd people
        if(i % 2 == 0) {
          firebase.database().ref('/CodeCapulets/people/' + selectedID + '/family').set('capulet');
          capuletsScore++;

          // if odd amount of people: last capulet has no target, give them first montague again
          randArray[i+1] ? target.uid = randArray[i+1].id : target.uid = randArray[1].id;

        } else {
          // if index is odd: montague
          firebase.database().ref('/CodeCapulets/people/' + selectedID + '/family').set('montague');
          montaguesScore++;

          target.uid = randArray[i-1].id;
        }

        // target word is random from array + add photo from target
        target.word = wordsArray[Math.floor(Math.random()*wordsArray.length)];
        target.fbPhotoUrl = peopleData[peopleData[selectedID].targets[0].uid].fbPhotoUrl;

        // set target
        firebase.database().ref('/CodeCapulets/people/' + selectedID + '/targets').child("0").set(target);
        console.log(peopleData[selectedID].family + ' ' + peopleData[selectedID].name + ' vs ' + peopleData[peopleData[selectedID].targets[0].uid].family + ' ' + peopleData[peopleData[selectedID].targets[0].uid].name)
        // set score for capulets and montagues;
        let score = { 'capulets': capuletsScore, 'montagues': montaguesScore };
        firebase.database().ref('/CodeCapulets/score').set(score);

        // let the games begin! (aka game = true)
        firebase.database().ref('/CodeCapulets/').child("game").set(true);
      }
    })
  }
}

export function scoreStatus(score) {
  return function(dispatch) {
    dispatch({ type: SCORE_STATUS, payload: score });
  }
}

export function stopGame() {
  firebase.database().ref('/CodeCapulets/').child("game").set(false);
  return function(dispatch) {
    dispatch({ type: GAME_STATUS, payload: false });
  }
}
