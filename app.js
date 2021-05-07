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

let database = {
  'worksbutdoesntdisapear': {
    filename: 'testing.mp3',
    count: 2
  },
  'audionotworking': {
    filename: 'testing.mp3',
    count: 2
  },
  'pictureworking': {
    filename: 'rufus.jpg',
    count: 1
  }
};

app.get('/:id', function (req, res) {
  if (!database.hasOwnProperty(req.params.id)) {
    return res.render('sorry')
  }

  let file = database[req.params.id]

  if (file.count <= 0) {
    return res.render('sorry') 
  }

  file.count = file.count - 1

  res.sendFile(file.filename, options)
})

/* Server Activation */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
