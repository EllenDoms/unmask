import * as firebase from 'firebase';

export const firebaseConfig = {
  apiKey: "AIzaSyBx4EtcNSwbpzty5Ozv3Qm5IJMAg0E3ICM",
  authDomain: "unmask-50759.firebaseapp.com",
  databaseURL: "https://unmask-50759.firebaseio.com",
  projectId: "unmask-50759",
  storageBucket: "unmask-50759.appspot.com",
  messagingSenderId: "285754494268"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const database = firebase.database()
export const ref = database.ref()
export const auth = firebase.auth
export const provider = new firebase.auth.FacebookAuthProvider()
