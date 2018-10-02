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
      const targets = loser.targets;
      const winnerIds = loser.targettedBy;
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

      // *** Herbereken totals
      scoreFamily = scoreFamily - 1;
      admin.database().ref("/" + game + "/score").child(family).set(scoreFamily);

      // if family = 0, no new target needed
      if(scoreFamily !== 0) {
        // Remove loser from targettedBy list  --> loser can not target anymore.
        targets.forEach(element => {
          if(element.success === false) {
            let targetId = element.uid;
            let targettedByArray = people[targetId].targettedBy;
            let targettedByIndex = targettedByArray.findIndex(element => {return element = uid});

            // remove targettedBy loser from his target
            admin.database().ref("/" + game + "/people/" + targetId + '/targettedBy').remove(targettedByIndex);
          }
        })
        // Winner: success on true + new target & word + add to targettedBy new target
        winnerIds.forEach(winnerId => {
          // Winner = nieuw target + woord
          // Find first person with least amount of targettedBy + alive + same family as former target
          let newTargetPerson = ""
          peopleArray.find(person => {
            if(!person.targettedBy && person.alive === true && person.family === family && person.id !== loser.id) {
              newTargetPerson = person;
            } else {
              let leastTargettedBy = 1;
              do {
                newTargetPerson = peopleArray.find(person => {
                  return person.targettedBy.length === leastTargettedBy && person.alive === true && person.family === family && person.id !== loser.id;
                });
                leastTargettedBy++;
              }
              while (newTargetPerson === "");
            }
            // Find which target is the loser
            let loserIndex = people[winnerId].targets.findIndex(index => { return index.uid === uid })
            // Every winner gets loser success on true
            admin.database().ref("/" + game + "/people/" + winnerId + '/targets/' + loserIndex ).child("success").set(true);
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
          let lengthTargets = people[winnerId].targets.length;

          admin.database().ref("/" + game + "/people/" + winnerId + "/targets").child(lengthTargets).set(newTarget);
          // Add winner to targettedBy newTarget
          let lengthTargets2 = people[newTargetPerson.id].targets.length;
          admin.database().ref("/" + game + "/people/" + newTargetPerson.id + '/targettedBy').child(lengthTargets2).set(winnerId);
        })
      }
      return uid
    }).catch(err => console.log(err));
}
