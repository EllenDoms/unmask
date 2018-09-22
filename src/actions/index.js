import { LOGIN_USER } from './types.js';
import * as firebase from "firebase";
import { withRouter } from 'react-router-dom';


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
