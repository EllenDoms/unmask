import { GAME_EXISTS, LOGIN_USER, LOGOUT_USER, LOADING, GAME_STATUS, SCORE_STATUS, UPDATE_USER } from './types.js';
import * as firebase from "firebase";

export function setGame(gameCode) {
  return function(dispatch) {
    dispatch({ type: GAME_EXISTS, payload: gameCode });
  }
}

export const login = (user) => (dispatch, getState) => {
  firebase.database().ref(getState().exists.game + '/people/' + user.uid).once('value')
  .then(snapshot => snapshot.val()).then(val => {
    if(val) {
      dispatch({
        type: LOGIN_USER,
        user: val,
        loggedIn: true,
      });
    } else {
      let params = {
        id: user.uid,
        admin: false,
        fbPhotoUrl: user.photoURL,
        name: user.displayName,
        family: '',
        selfieUrl: '',
        targettedBy: [],
        alive: true,
        targets: [
          {
            uid: user.uid,
            word: '',
            success: false
          }
        ],
      }
      firebase.database().ref('/' + getState().exists.game + '/people/' + user.uid).update(params);
      dispatch({
        type: LOGIN_USER,
        user: params,
        loggedIn: true,
      });
    }
  })

  firebase.database().ref('/' + getState().exists.game + '/people/' + user.uid).on('value', (snapshot) => {
    dispatch({ type: UPDATE_USER, payload: snapshot.val() })
  });
};

export const logout = () => (dispatch) => {
  firebase.auth().signOut().then(function() {
    dispatch({
      type: LOGOUT_USER,
      loggedIn: false,
    });
  }).catch(function(error) { console.log(error) });
}

export function stopLoading() {
  return function(dispatch) {
    dispatch({ type: LOADING, payload: false });
  }
}

export function uploadSelfie(upload) {
  return function(dispatch, getState) {
    let userId = getState().data.user.id

    // Storing in user folder in picture folder
    firebase.storage().ref(getState().exists.game + '/' + userId).put(upload)
      .then(function(snapshot) {
        firebase.storage().ref(getState().exists.game).child('/' + userId).getDownloadURL().then(function(selfieUrl) {
          firebase.database().ref(getState().exists.game + '/people/' + userId).child('selfieUrl').set(selfieUrl);
        }).catch(function(error) {console.log(error) });
      }).catch(function(error) {console.log(error) });
  }
}
export function registerGame() {
  return function(dispatch, getState) {
    let userId = getState().data.user.id;
    firebase.database().ref(getState().exists.game + '/people/' + userId).child('enrolled').set(true);
  }
}
export function gameStatus(status) {
  return function(dispatch) {
    dispatch({ type: GAME_STATUS, payload: status });
  }
}
export function scoreStatus(score) {
  return function(dispatch) {
    dispatch({ type: SCORE_STATUS, payload: score });
  }
}
export function updateUser(user) {
  return function(dispatch) {
    dispatch({ type: UPDATE_USER, payload: user });
  }
}

export function startGame(start) {
  return function(dispatch, getState) {
    let game = getState().exists.game;
    // Assign to a family
    firebase.database().ref('/'+ game + '/').once('value').then(function(snapshot) {
      const peopleData = snapshot.val().people;
      const wordsData = snapshot.val().words;

      // convert stupid firebase objects to normal array
      const wordsArray = Object.keys(wordsData).map((key) => wordsData[key])
      const allPeopleArray = Object.keys(peopleData).map((key) => peopleData[key])

      //array only with enrolled people
      const peopleArray = [];
      allPeopleArray.map(person => {
        if(person.enrolled) {
          peopleArray.push(person);
        }
      })

      // randomize array with people
      const randArray = peopleArray.sort((a, b) => {return 0.5 - Math.random()});
      let capuletsScore = 0;
      let montaguesScore = 0;
      for(let i = 0; i < randArray.length; i++) {
        let selectedID = randArray[i].id;
        let target = {
          success: false,
          uid: '',
          name: '',
          word: '',
          selfieUrl: ''
        }

        // even and odd people
        let family = ''
        if(i % 2 === 0) {
          family = 'capulet'
          capuletsScore++;

          // if odd amount of people: last capulet has no target, give them first montague again
          randArray[i+1] ? target.uid = randArray[i+1].id : target.uid = randArray[1].id;

        } else {
          // if index is odd: montague
          family = 'montague'
          montaguesScore++;

          target.uid = randArray[i-1].id;
        }
        firebase.database().ref('/'+ game + '/people/' + selectedID + '/family').set(family);
        firebase.database().ref('/'+ game + '/people/' + selectedID + '/alive').set(true);
        // target word is random from array + add photo from target
        target.word = wordsArray[Math.floor(Math.random()*wordsArray.length)];
        target.selfieUrl = peopleData[target.uid].selfieUrl;
        target.name = peopleData[target.uid].name;

        // set target
        firebase.database().ref('/'+ game + '/people/' + selectedID ).child("targets").set({0: target});
        firebase.database().ref('/'+ game + '/people/' + target.uid ).child("targettedBy").set({ 0: selectedID});
        // set score for capulets and montagues;
        let score = { 'capulet': capuletsScore, 'montague': montaguesScore };
        firebase.database().ref('/'+ game + '/score').set(score);

        // let the games begin! (aka game = true)
        firebase.database().ref('/' + game + '/').child("game").set(true);
      }
    })
  }
}

export function stopGame() {
  return function(dispatch, getState) {
    firebase.database().ref('/' + getState().exists.game + '/').child("game").set(false);
    dispatch({ type: GAME_STATUS, payload: false });
  }
}

export function iDied(uid) {
  return function(dispatch, getState) {
    let game = getState().exists.game

    var iDied = firebase.functions().httpsCallable('idied');
    iDied({game});
  }
}
