"use strict";

// Simulates the kind of delay we see with network or filesystem operations
function matchUserIdByEmail(enteredEmail, users) {
  for (var id in users) {
    if (users[id].email === enteredEmail) {
      return id;
    }
  }
  return;
}
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    getTweets: function (callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        // make each tweet have user information
        callback(null, tweets);
      });
    },
    saveTweet: function (newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, true);
    },
    userLoggedIn: function (enteredEmail, enteredPassword, callback) {
      db.collection("users").find().toArray((err, users) => {

        if (err) {
          console.log(err);
          return callback(err);
        }
        for (var user of users) {
          if (enteredEmail === user.email) {
            /* let passwordValid = bcrypt.compareSync(
              enteredPassword,
              users[matchUserIdByEmail(enteredEmail, users)].password
            ); */
            let passwordValid =
              (enteredPassword === user.password);

            if (passwordValid) {
              console.log("enteredPassword", enteredPassword);
              console.log("user", user);
              return callback(null, user.id);
            } else {
              //user found, but password is not valid
              return callback(true);
            }
          }
        }
        // no user was found
        callback(true);
      });
    }

  };
}