/* Required External Modules */
const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const session = require('express-session');

/* App Variables */
const app = express();
const port = process.env.PORT || "8000";

/* App and route configuration */
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.get('/', function(req, res) {
  res.render('index')
});

const options = {
  root: path.join(__dirname, '../files')
}
const fileName = 'testing.mp3'

app.get('/test', function(req, res, next) {
  if (req.session.views == 1) {
    req.session.views++
    res.sendFile(fileName, options)
  } else {
    res.render('sorry')
  }
});

/* Server Activation */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
