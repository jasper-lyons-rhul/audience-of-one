/**
* Required External Modules
*/
const express = require("express");
const path = require("path");

/**
* App Variables
*/
const app = express();
const port = process.env.PORT || "8000";

/**
*  App Configuration
*/
app.use(express.static(__dirname + '/public'));


/**
* Server Activation
*/
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
