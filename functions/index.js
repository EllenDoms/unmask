// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// link oproepen is get call
exports.idied = functions.https.onCall((data, context) => {
  const game = data.game;
  const uid = context.auth.uid;

  if(game && uid){
    return processDeath(uid, game)
  }

  return null;
});

const processDeath = (uid, game) => {
  return admin.database().ref("/" + game).once('value').then(c => c.val())
    .then(gameInfo => {
      const people = gameInfo.people;
      const allPeopleArray = Object.keys(people).map((key) => people[key])
      const words = gameInfo.words;
      const wordsArray = Object.keys(words).map((key) => words[key])
      const loser = people[uid];
      const family = loser.family;
      const targetsData = loser.targets;
      const targetsArray = Object.keys(targetsData).map((key) => targetsData[key])
      const winnerIdsData = loser.targettedBy;
      const winnerIdsArray = winnerIdsData ? Object.keys(winnerIdsData).map((key) => winnerIdsData[key]) : '';
      let scoreFamily = gameInfo.score[family];

      //array only with enrolled people
      const peopleArray = [];
      allPeopleArray.map(person => {
        if(person.enrolled) {
          peopleArray.push(person);
        }
      })

      // Alive: false
      admin.database().ref("/" + game + "/people/" + uid ).child("alive").set(false);

      // Herbereken totals
      scoreFamily = scoreFamily - 1;
      admin.database().ref("/" + game + "/score").child(family).set(scoreFamily);

      // if family = 0, game would be over
      if(scoreFamily !== 0) {
        // Remove loser from targettedBy list  --> loser can not target anymore.
        targetsArray.forEach(target => {
          if(target.success === false) {
            // remove targettedBy loser from his target
            admin.database().ref("/" + game + "/people/" + target.uid + '/targettedBy').child(loser.id).remove();
          }
        })
        // Winner: success on true + new target & word + add to targettedBy new target
        winnerIdsArray.forEach(winnerId => {

          // Winner = nieuw target + woord
          // Every winner gets loser success on true
          admin.database().ref("/" + game + "/people/" + winnerId + '/targets/' + loser.id ).child("success").set(true);

          // Find first person with least amount of targettedBy + alive + same family as former target
          let newTargetPerson = "";
          peopleArray.find(person => {
            if(!person.targettedBy && person.alive === true && person.family === family && person.id !== loser.id) {
              newTargetPerson = person;
            } else {
              let leastTargettedBy = 1;
              do {
                const targettedByArray = Object.keys(person.targettedBy).map((key) => person.targettedBy[key])
                newTargetPerson = peopleArray.find(person => {
                  return targettedByArray.length === leastTargettedBy && person.alive === true && person.family === family && person.id !== loser.id;
                });
                leastTargettedBy++;
              }
              while (newTargetPerson === "");
            }

          })
          // Random word
          let newWord = wordsArray[Math.floor(Math.random()*wordsArray.length)];
          // Every winner gets new target
          let newTarget = {
            success: false,
            uid: newTargetPerson.id,
            name: newTargetPerson.name,
            word: newWord,
            selfieUrl: newTargetPerson.selfieUrl
          }
          // length of targetlist?
          admin.database().ref("/" + game + "/people/" + winnerId + "/targets").push(newTarget);
          // Add winner to targettedBy newTarget
          admin.database().ref("/" + game + "/people/" + newTargetPerson.id + '/targettedBy').push(winnerId);
        })


      }
      return uid
    }).catch(err => console.log(err));
}

exports.stopgame = functions.https.onCall((data, context) => {
  const game = data.game;
  const uid = context.auth.uid;

  if(game && uid){
    return processStop(uid, game)
  }

  return null;
});

const processStop = (uid, game) => {
  admin.database().ref('/' + game + '/').child("game").set(false);
  dispatch({ type: GAME_STATUS, payload: false });

  // remove targets + targettedBy
  admin.database().ref("/" + game + '/people').once('value').then(c => c.val())
    .then(people => {
      const allPeopleArray = Object.keys(people).map((key) => people[key])
      allPeopleArray.forEach(person => {
        firebase.database().ref("/" + game + "/people/" + person.id + '/targets').remove();
        firebase.database().ref("/" + game + "/people/" + person.id + '/targettedBy').remove();
      })
      return uid;
    }).catch(err => console.log(err));

}
