const layout = require('express').Router();
const { join } = require('path');
const cookieParser = require('cookie-parser');
const User = require('../model/signupModel');

layout.get("/", (req, res)=>{
    let user = new User();
    let { data } = JSON.parse(req.cookies.token);
    if(user.getUser!= data.nick) return res.clearCookie("token").redirect('logIn')
    res.sendFile(join(req.__dirname, process.env.EXPRESS_STATIC, '/views/crud.html'));
})


module.exports = layout;