"use strict";


const express = require('express');
const loginRoutes = express.Router();

// Why below doesnt work?
module.exports = function (DataHelpers) {
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