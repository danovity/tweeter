"use strict";


const express = require('express');
const loginRoutes = express.Router();
var path = require("path");

/* loginRoutes.get('/', (req, res) => {
    res.sendFile(path.resolve('public/login.html'));
});

loginRoutes.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(`${email}, ${password}`);
});

module.exports = loginRoutes;


 */
//at post /login, check if user is logged in


// Why below doesnt work?
module.exports = function (DataHelpers) {

    /*    loginRoutes.get('/', (req, res) => {

       }); */


    //sign in cookie
    loginRoutes.post("/", (req, res) => {

        let enteredEmail = req.body.email;
        let enteredPassword = req.body.password;
        let id = DataHelpers.userLoggedIn(enteredEmail, enteredPassword, (err, id) => {
            if (err) {
                res.status(403);
                res.send("Invalid password or username.");
            } else {
                req.session.user_id = id;
                res.send(req.session.user_id);
            }
        });
    });
    return loginRoutes;
};