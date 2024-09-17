const controlerLogin = require('../controller/loginController');
const express = require('express');
const logIn = express();
const cookieParser = require('cookie-parser');

logIn.post("/", cookieParser(), express.json(), controlerLogin.login);
logIn.get("/", cookieParser(), controlerLogin.findcookie);

module.exports = logIn;