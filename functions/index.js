// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// link oproepen is get call
exports.idied = functions.https.onCall((data, context) => {
  const game = data.gameExists;
  const uid = context.auth.uid;

  if(game && uid){
    return processDeath(uid, game)
  }
  return null;
});
const processDeath = (uid, game) => {
  return admin.database().ref("/games/" + game).once('value').then(c => c.val())
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

      //array only with enrolled people
      const peopleArray = [];
      allPeopleArray.map(person => {
        if(person.enrolled) {
          peopleArray.push(person);
        }
      })

      // Alive: false
      admin.database().ref("/games/" + game + "/people/" + uid ).child("alive").set(false);

      // Update family score
      let scoreFamily = -1; //minus one: the person dying right now?
      peopleArray.forEach(person => {
        if(person.alive === true && person.family === family) { scoreFamily++; }
      })
      admin.database().ref("/games/" + game + "/score").child(family).set(scoreFamily);


      // if family = 0, game would be over
      if(scoreFamily !== 0) {
        // Remove loser from targettedBy list  --> loser can not target anymore.
        targetsArray.forEach(target => {
          if(target.success === false) {
            // remove targettedBy loser from his target
            admin.database().ref("/games/" + game + "/people/" + target.uid + '/targettedBy').child(loser.id).remove();
          }
        })
        // Winner: success on true + new target & word + add to targettedBy new target
        winnerIdsArray.forEach(winnerId => {

          // Winner = nieuw target + woord
          // Every winner gets loser success on true
          admin.database().ref("/games/" + game + "/people/" + winnerId + '/targets/' + loser.id ).child("success").set(true);

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
          admin.database().ref("/games/" + game + "/people/" + winnerId + "/targets").push(newTarget);
          // Add winner to targettedBy newTarget
          admin.database().ref("/games/" + game + "/people/" + newTargetPerson.id + '/targettedBy').push(winnerId);
        })


      }
      return uid
    }).catch(err => console.log(err));
}

exports.stopgame = functions.https.onCall((data, context) => {
  const game = data.gameExists;
  const uid = context.auth.uid;

  if(game && uid){
    return processStop(uid, game)
  }

  return null;
});
const processStop = (uid, game) => {
  admin.database().ref("/games/" + game + '/').child("playing").set(false);

  // remove targets + targettedBy
  admin.database().ref("/games/" + game + '/people').once('value').then(c => c.val())
    .then(people => {
      const allPeopleArray = Object.keys(people).map((key) => people[key])
      allPeopleArray.forEach(person => {
        admin.database().ref("/games/" + game + "/people/" + person.id + '/targets').remove();
        admin.database().ref("/games/" + game + "/people/" + person.id + '/targettedBy').remove();
      })
      return uid;
    }).catch(err => console.log(err));

}

exports.startgame = functions.https.onCall((data, context) => {
  const game = data.gameExists;
  const uid = context.auth.uid;

  if(game && uid){
    return processStart(uid, game)
  }

  return null;
})
const processStart = (uid, game) => {
  admin.database().ref("/games/" + game + '/').once('value').then(function(snapshot) {
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
      admin.database().ref("/games/" + game + '/people/' + selectedID + '/family').set(family);
      admin.database().ref("/games/" + game + '/people/' + selectedID + '/alive').set(true);
      // target word is random from array + add photo from target
      target.word = wordsArray[Math.floor(Math.random()*wordsArray.length)];
      target.selfieUrl = peopleData[target.uid].selfieUrl;
      target.name = peopleData[target.uid].name;

      // set target + targettedby (can be multiple)
      admin.database().ref("/games/" + game + '/people/' + selectedID + '/targets').child(target.uid).set(target);

      // for each target add one to targettedBy
      admin.database().ref("/games/" + game + '/people/' + target.uid + '/targettedBy').child(selectedID).set(selectedID);

      // set score for capulets and montagues;
      let score = { 'capulet': capuletsScore, 'montague': montaguesScore };
      admin.database().ref("/games/" + game + '/score').set(score);

      // let the games begin! (aka game = true)
      admin.database().ref("/games/" + game + '/').child("playing").set(true);

    }
    return null;
  }).catch(err => console.log(err));
}
