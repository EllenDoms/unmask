// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const game = "CodeCapulets"

// link oproepen is get call

// if died
exports.isdead = functions.https.onRequest((request, response) => {
  let uid = request.query.uid;

  // Success op true van target met uid
  admin.database().ref("/" + game).once('value').then(c => c.val()).then(snapshot => {

    const people = snapshot.people;
    const loser = people[uid];
    const family = loser.family;
    const targets = loser.targets;
    const winnerIds = loser.targettedBy;
    let scoreFamily = snapshot.score[family];

    // Herbereken totals
    scoreFamily = scoreFamily - 1;
    admin.database().ref("/" + game + "/score").child(family).set(scoreFamily);

    // Remove loser from targettedBy list  --> loser can not target anymore.
    targets.forEach(element => {
      if(element.success === false) {
        let targetId = element.uid;
        let targettedByArray = people[targetId].targettedBy;
        let targettedById = targettedByArray[0];
        admin.database().ref("/" + game + "/people/" + targetId + '/targettedBy').remove(uid)
        response.send(targettedById);
      }
    })

    // Winner = nieuw target + woord
    // get target that is not targettedBy --> array

    // Alive: false
    admin.database().ref("/" + game + "/people/" + uid ).child("alive").set(false);

    return snapshot;
  }).catch(error => { console.error(error) });





});
