/* Required External Modules */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

/* App variables */
const app = express();
const port = process.env.PORT || '8000';

/* App configuration */
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

/* Variables needed to serve files and count views */
const options = {
  root: path.join(__dirname, 'files')
};
const fileName = 'testing.mp3';
const map = new Map();

/* Route configuration */
/* Homepage */
app.get('/', function(req, res) {
  res.render('index')
});

/* Test file, no self-destruct */
app.get('/test', function(req, res) {
  res.sendFile(fileName, options)
});

/* Test file with self-destruct */
const urlID = 'uiop';

app.get('/' + urlID, function (req, res) {
  const ipAddress = req.ip

  if (!map.has(ipAddress)) {
    console.log(map.has(ipAddress))

    map.set(ipAddress, urlID)
    res.sendFile(fileName, options)

  } else {
    console.log(map.has(ipAddress))
    res.render('sorry')
  }
})

/* Server Activation */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
