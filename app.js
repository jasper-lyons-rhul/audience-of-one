/* Required External Modules */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fs = require('fs');

/* App Variables */
const app = express();
const port = process.env.PORT || '8000';

/* App and route configuration */
app.set('view engine', 'ejs');
app.set('trust proxy', true);

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

const options = {
  root: path.join(__dirname, 'files')
};

const fileName = 'dotlet.mp4';

app.get('/', function(req, res) {
  res.render('index')
});

app.get('/test', function(req, res) {
  res.sendFile(fileName, options)
});

// app.get('/01', function(req, res, next) {
//   if (req.session.views == 1) {
//     req.session.views++
//     res.sendFile(fileName, options)
//   } else {
//     res.render('sorry')
//   }
// });

const map = new Map();

/* To be refactored into individual file paths */
const urlID = 'adfknl';

app.get('/' + urlID, function (req, res, next) {
  const ipAddress = req.ip;

  if (map.has(ipAddress) === false) {

    res.sendFile(fileName, options)
    map.set(ipAddress, urlID)

  } else {
    res.send('nope!');
  }
});
/* -- */

/* To be refactored into individual file paths */
const urlID1 = 'ionjka';

app.get('/' + urlID1, function (req, res) {
  const ipAddress = req.ip

  if (!map.has(ipAddress)) {
    console.log(map.has(ipAddress))
    res.sendFile(fileName, options)
    map.set(ipAddress, urlID)

  } else {
    console.log(map.has(ipAddress))
    res.send('nope!')
  }
})

/* -- */


/* Server Activation */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
