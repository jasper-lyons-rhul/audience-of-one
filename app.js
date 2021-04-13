'use strict';

/* Required External Modules */
const express = require('express');
const path = require('path');

/* App variables */
const app = express();
const port = process.env.PORT || '8000';

/* App configuration */
app.set('view engine', 'ejs');
app.set('trust proxy', true);

/* Variables needed to serve files and count views */
const options = {
  root: path.join(__dirname, 'files')
};

const map = new Map();

/* Route configuration */
/* Homepage */
app.get('/', function(req, res) {
  res.render('index')
});

/* Homepage */
app.get('/control', function(req, res) {
  res.sendFile('testing.mp3', options)
});

/* Function to create new one time links */
function createNewLink (urlID, fileName) {
  app.get('/' + urlID, function (req, res) {
    const ipAddress = req.ip

    if (!map.has(ipAddress)) {
      res.sendFile(fileName, options)
      map.set(ipAddress, urlID)

    } else {
      res.render('sorry')
    }
  })
};

createNewLink('testing', 'testing.mp3')

/* Server Activation */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
