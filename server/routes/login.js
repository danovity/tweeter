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


// Why below doesnt work?
module.exports = function () {

    loginRoutes.get('/', (req, res) => {
        res.sendFile(path.resolve('public/login.html'));
    });
    loginRoutes.post('/', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        console.log(`${email}, ${password}`);
    });

    return loginRoutes;
};