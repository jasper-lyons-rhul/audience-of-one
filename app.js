'use strict';

/* Required External Modules */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

/* App variables */
const app = express();
const port = process.env.PORT || '8000';

/* App configuration */
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

/* Variables needed to serve files and count views */
const options = {
  root: path.join(__dirname, 'public', 'files')
};

/* Route configuration */
/* Homepage */
app.get('/', function(req, res) {
  res.render('index')
});

/* Control – a page serving an mp3 file which doesn't disappear */
app.get('/worksbutdoesntdisappear', function(req, res) {
  res.sendFile('testing.mp3', options)
});

/* Function to create new one time links */
function createNewLink (urlID, fileName) {
  var count = 0;

  app.get('/' + urlID, function (req, res) {
    if (count === 0) {
      res.sendFile(fileName, options)
      count++

    } else {
      res.render('sorry')
    }
  })
};

createNewLink('audionotworking', 'testing.mp3')
createNewLink('pictureworking', 'rufus.jpg')

/* Server Activation */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
