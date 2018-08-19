"use strict";

const express = require('express');
const logoutRoutes = express.Router();

var path = require("path");

// Why below doesnt work?
module.exports = function () {
    //delete cookie

    logoutRoutes.get("/", (req, res) => {
        console.log("logoutRoutes");
        req.session = null;
        console.log(req.session);
        res.status(200);
        res.send("logged out.")
    });

    return logoutRoutes;
};