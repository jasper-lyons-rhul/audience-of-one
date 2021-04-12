/* Required External Modules */
const express = require("express");
const path = require("path");

/* App Variables */
const app = express();
const port = process.env.PORT || "8000";

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
