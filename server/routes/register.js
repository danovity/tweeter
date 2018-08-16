"use strict";


const express = require('express');
const registerRoutes = express.Router();
var path = require("path");

registerRoutes.get('/', (req, res) => {
    res.sendFile(path.resolve('public/register.html'));
});

module.exports = registerRoutes;