/* Required External Modules */
const express = require("express");
const path = require("path");
import firebase from "firebase/app";
import "firebase/analytics";

/* App Variables */
const app = express();
const port = process.env.PORT || "8000";
cconst firebaseConfig = {
  apiKey: "AIzaSyAhpWYBvDu_DF3HGig3Absum-qzKnOmm3k",
  authDomain: "audience-of-one.firebaseapp.com",
  projectId: "audience-of-one",
  storageBucket: "audience-of-one.appspot.com",
  messagingSenderId: "164576457461",
  appId: "1:164576457461:web:037e8f768505b3bb404bbc",
  measurementId: "G-521053G3PN"
};

firebase.initializeApp(firebaseConfig);

/* App and route configuration */
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index')
});

app.get('/7f7rsyvn', function(req, res, next) {
  const options = {
    root: path.join(__dirname, '../files')
  }
  const fileName = 'testing.mp3'
  res.sendFile(fileName, options, function(err) {
    if (err) {
      next(err)
    } else {
      console.log('Sent', fileName)
    }
  })
});

/* Server Activation */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
