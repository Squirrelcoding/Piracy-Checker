var fs = require('fs')
var json = require('./values.json')
var admin = require('firebase-admin');
const serviceAccount = require('./key.json');
var generateString = require('./generateString.js');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://poopnet-4fb22.firebaseio.com"
});
const db = admin.firestore();
var valueA = json.valueA;
var valueB = json.valueB;
if (valueA == "" && valueB == "") {

  //Generating New values
  var newValues = {
    valueA: generateString.generate(20),
    valueB: generateString.generate(20)
  }

  //Writing the new values to values.json
  const jsonString = JSON.stringify(newValues)
  fs.writeFile('./values.json', jsonString, err => {
    console.log("Writing to file...")
      if (err) {
          console.log('Error writing file', err)
      } else {
          console.log('Successfully wrote file')
      }
  })


  //Writing the New values to Firebase
  db.collection("Test").doc(newValues.valueA).set({
    key: newValues.valueB
  })
  //Continue Program via require

}




 if (valueA != "" && valueB != "") {
  async function f() {
    console.log("function is being executed...")
    const docRef = await db.collection("Test").doc(json.valueA);
    const doc = await docRef.get();
    if (doc.exists) {
      // Continue Program via require
    }
    else {
      // Handle Piracy
      console.log("User owns pirated copy.")
    }
  }
  f();
}
