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
    let { game } = getState().exists;

    let startGame = firebase.functions().httpsCallable('startgame');
    startGame({game});
    dispatch({ type: GAME_STATUS, payload: true });
  }
}

export function stopGame() {
  return function(dispatch, getState) {
    let { game } = getState().exists

    let stopGame = firebase.functions().httpsCallable('stopgame');
    stopGame({game})
    dispatch({ type: GAME_STATUS, payload: false });
  }
}

export function iDied(uid) {
  return function(dispatch, getState) {
    let { game } = getState().exists

    let iDied = firebase.functions().httpsCallable('idied');
    iDied({game});
    dispatch({ type: UPDATE_USER, payload: {alive: false} });
  }
}
