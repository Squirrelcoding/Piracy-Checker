//Requiring packages and files
var fs = require('fs')
var os = require('os');
var json = require('./values.json')
var admin = require('firebase-admin');
const serviceAccount = require('./key.json');
var generateString = require('./generateString.js');

//Initalizing Firebase app.
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://poopnet-4fb22.firebaseio.com"
});
const db = admin.firestore();

//Values for checking piracy
var valueA = json.valueA;
var valueB = json.valueB;


if (valueA == "" && valueB == "") {

  //Generating New values
  var passcode 
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
          console.log('Successfully wrote new values to file')
      }
  })


  //Writing the New values to Firebase
  db.collection("Test").doc(newValues.valueA).set({
    key: newValues.valueB,
    uniqueProperties: { //Get the Users OS and Home directory
      os: os.platform(),
      homedir: os.homedir()
    }
  })
  //Continue Program via require
  require('./something.js')

}



 //Checks if the values A and B are not blank, if not that means the user has run the program for the first time.
 if (valueA != "" && valueB != "") {

  //Asynchronus Funtion to check if 
  async function f() {
    console.log("function is being executed...")
    const docRef = await db.collection("Test").doc(json.valueA);
    const doc = await docRef.get();
    if (doc.exists) {

      if (valueB != doc.data().key) { 
        //Handle Piracy
        //Checks if value B matches the key in the json file, if it dosen't, then this if statement will handle the piracy
      }
      else if (valueB == doc.data().key && os.platform() == doc.data().uniqueProperties.os && doc.data().uniqueProperties.homedir == os.homedir()){
        //Continue the program via require
        require('./something.js')
      }
    }
    else {
      // Handle Piracy
      console.log("User owns pirated copy.")
    }
  }


  f();
}
