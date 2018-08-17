"use strict";

// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var tweeterDB, userDB;
var cookieSession = require("cookie-session");
const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");

app.set('view engine', 'html');

const {
  MongoClient
} = require("mongodb");

const MONGODB_URI = "mongodb://localhost:27017/tweeter";

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    signed: false,

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
//how to access "tweets" and "users" collection?
MongoClient.connect(MONGODB_URI, (err, db) => {
  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);
  const loginRoutes = require('./routes/login')(DataHelpers);
  //console.log('loginRoutes', loginRoutes);
  //const registerRoutes = require('./routes/register')();

  app.use("/tweets", tweetsRoutes);
  app.use("/login", loginRoutes);
  //app.use("/register", registerRoutes);
});

/* MongoClient.connect("mongodb://localhost:27017/user", (err, db) => {
  userDB = db;
}); */



app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});