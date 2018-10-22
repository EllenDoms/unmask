import { SET_GAME, USERS_ENROLMENT, LOGIN_USER, GET_GAMES, LOADING, GAME_STATUS, SCORE_STATUS, UPDATE_USER } from './types.js';
import * as firebase from "firebase";
import { database } from '../config/firebase';
import history from '../auth/history';

export function setGame(gameCode) {
  return function(dispatch) {
    if(!gameCode) {
      dispatch({ type: SET_GAME, payload: 'noGame' });
    } else {
      dispatch({ type: SET_GAME, payload: gameCode });
      firebase.database().ref('games/' + gameCode).once('value')
      .then(snapshot => {
        if (!snapshot.val()) {
          dispatch({ type: SET_GAME, payload: false });
        }
      })
    }
  }
}

export const newGame = () => (dispatch, getState) => {
  firebase.database().ref('games/').push({
    playing : 'setup',
    words : ['Ananas', 'Kiwi']
  })
    .then((snapshot) => {
      let game = snapshot.key;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {

          let params = {
            id: user.uid,
            role: 'admin',
            fbPhotoUrl: user.photoURL,
            name: user.displayName,
            family: '',
            selfieUrl: '',
            targettedBy: [],
            alive: true,
          }
          firebase.database().ref('games/' + game + '/people/' + user.uid).update(params);
          dispatch({ type: UPDATE_USER, payload: params, });

          // add this game to the person's games with role
          firebase.database().ref( '/people/' + user.uid + '/games/').child(game).set('admin');

          history.push('/?game=' + game);
          window.location.reload();
        }
      })
  })
}
export const saveGameInfo = () => (dispatch, getState) => {
  let gameId = getState().general.gameExists
  firebase.database().ref('games/' + gameId).child('playing').set('no');
}
export const login = (user) => (dispatch, getState) => {
  if(user === null) { // user not logged in
    dispatch({ type: LOGIN_USER, payload: {loggedIn: false} });
  } else {
    // add user to people
    database.ref('/people/' + user.uid).once('value')
    .then(snapshot => snapshot.val()).then(val => {
      if(val) {
        val.loggedIn = true;
        dispatch({ type: LOGIN_USER, payload: val });
        firebase.database().ref('/people/' + user.uid).child('/loggedIn').set(true);
      } else {
        let params = {
          loggedIn: true,
          uid: user.uid,
          fbPhotoUrl: user.photoURL,
          name: user.displayName,
          games: []
        }
        firebase.database().ref('/people/' + user.uid).set(params);
        dispatch({ type: LOGIN_USER, payload: params });
      }
    })
    // check if there is a game...
    let { gameExists } = getState().general;
    if (gameExists && gameExists !== 'noGame') {
      dispatch(loginGame(user, gameExists))
    }
  }
};
export const loginGame = (user, gameExists) => (dispatch, getState) => {
  let game = 'games/' + gameExists
  console.log(game)
  // if game exists
  // add/update person to game
  firebase.database().ref( game + '/people/').once('value')
  .then(snapshot => snapshot.val()).then(val => {
    let role = '';
    if(val && val[user.uid]) {
      // if person is already in game, update state
      dispatch({ type: UPDATE_USER, payload: val[user.uid], });
      role = val[user.uid].role;
    } else if(val) {
      // if person is not yet in game, add him/her
      // first person is admin, rest is team
      role = val ? 'team' : 'admin'

      let params = {
        id: user.uid,
        role: role,
        fbPhotoUrl: user.photoURL,
        name: user.displayName,
        family: '',
        selfieUrl: '',
        targettedBy: [],
        alive: true,
      }
      firebase.database().ref(game + '/people/' + user.uid).update(params);
      dispatch({ type: UPDATE_USER, payload: params, });
    }
    // add this game to the person's games with role
    firebase.database().ref( '/people/' + user.uid + '/games/').child(gameExists).set(role);
  })

  firebase.database().ref( game + '/people/' + user.uid).on('value', (snapshot) => {
    dispatch({ type: UPDATE_USER, payload: snapshot.val() })
    // Count all registered for game
    firebase.database().ref( game + '/people/').on('value', (snapshot) => {
      if(snapshot.val()) {
        const peopleArray = Object.keys(snapshot.val()).map((key) => snapshot.val()[key])
        let amountRegistered = peopleArray.length;
        let amountReady = 0;
        peopleArray.forEach(person => {
          person.enrolled === true ? amountReady ++ : '';
        });
        dispatch({ type: USERS_ENROLMENT, registered: amountRegistered, ready: amountReady });
      }
    });
  });
}
export const logout = () => (dispatch, getState) => {
  let userId = getState().data.user.id
  firebase.auth().signOut().then(function() {
    firebase.database().ref('/people/' + userId).child('/loggedIn').set(false);
    dispatch({ type: LOGIN_USER, payload: false });
  }).catch(function(error) { console.log(error) });
}

export const getGames = (games) => (dispatch, getState) => {
  const user = getState().general.user
  const gamesArray = Object.keys(games);
  // for each game: add params to array
  let array = [];
  gamesArray.map(game => {
    firebase.database().ref('/games/' + game ).once('value')
    .then(snapshot => {
      if(snapshot.val()) {
        let params = {
          id: snapshot.key,
          playing: snapshot.val().playing,
          role: user.games[game],
          title: snapshot.val().title,
        }
        array.push(params);
        dispatch({ type: GET_GAMES, payload: array });
      }
    })
  })
}
export function stopLoading() {
  return function(dispatch) {
    dispatch({ type: LOADING, payload: false });
  }
}

export function uploadSelfie(upload) {
  return function(dispatch, getState) {
    let userId = getState().game.user.id;
    let gameId = getState().general.gameExists;

    // Storing in user folder in picture folder
    firebase.storage().ref(gameId + '/' + userId).put(upload)
      .then(function(snapshot) {
        firebase.storage().ref(gameId).child('/' + userId).getDownloadURL().then(function(selfieUrl) {
          console.log(selfieUrl)
          firebase.database().ref('games/' + gameId + '/people/' + userId).child('selfieUrl').set(selfieUrl);
        }).catch(function(error) {console.log(error) });
      }).catch(function(error) {console.log(error) });
  }
}
export function enroll() {
  return function(dispatch, getState) {
    let userId = getState().game.user.id;
    firebase.database().ref('games/' + getState().general.gameExists + '/people/' + userId).child('enrolled').set(true);
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
  console.log(user)
  return function(dispatch) {
    dispatch({ type: UPDATE_USER, payload: user });
  }
}

export function startEnroll() {
  return function(dispatch, getState) {
    const { gameExists } = getState().general;
    firebase.database().ref('games/' + gameExists ).child('playing').set('enroll');
  }
}
export function startGame(start) {
  return function(dispatch, getState) {
    let { gameExists } = getState().general;

    // loading until gamestatus changed?
    dispatch({ type: LOADING, payload: true });
    let startGame = firebase.functions().httpsCallable('startgame');
    startGame({gameExists});
  }
}
export function stopGame() {
  return function(dispatch, getState) {
    let { gameExists } = getState().general;

    let stopGame = firebase.functions().httpsCallable('stopgame');
    stopGame({gameExists})
    dispatch({ type: GAME_STATUS, payload: 'no' });
  }
}
export function iDied(uid) {
  return function(dispatch, getState) {
    let { gameExists } = getState().general
    let uid = getState().game.user.id;

    firebase.database().ref(`actions/${uid}/idied`).push().set({game: gameExists})
    dispatch({ type: UPDATE_USER, payload: {alive: false} });
  }
}
