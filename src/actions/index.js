import { LOGIN_USER, GAME_STATUS, SCORE_STATUS } from './types.js';
import * as firebase from "firebase";

export const login = (user) => (dispatch, ownProps) => {
  let params = {
    id: user.uid,
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
  firebase.database().ref('/CodeCapulets/people/' + user.uid).once('value').then(function(snapshot) {

    if (snapshot.val() !== null) {
      dispatch({
        type: LOGIN_USER,
        user: snapshot.val(),
        loggedIn: true
      });
    } else {
      firebase.database().ref('/CodeCapulets/people/' + user.uid).update(params);
      dispatch({
        type: LOGIN_USER,
        user: params,
        loggedIn: true
      });
    }
    // f
  });


};

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
