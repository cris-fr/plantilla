const express = require('express');
const cookieParser = require('cookie-parser');
const openningRouter = require('./server/router/openningRouter');
const loginRouter = require('./server/router/loginRouter');
const signupRouter = require('./server/router/signupRouter');
const productRouter = require('./server/router/productRouter');
const { join } = require('path');
const app = express();

app.use('/css', express.static(join(__dirname, process.env.EXPRESS_STATIC, 'css')))
app.use('/js', express.static(join(__dirname, process.env.EXPRESS_STATIC, 'js')))
app.use('/storage', express.static(join(__dirname, process.env.EXPRESS_STATIC, 'storage')))





app.use("/", (req, res, next)=>{
    req.__dirname = __dirname;
    next()
}, openningRouter);

app.use("/logIn", (req, res, next)=>{
    req.__dirname = __dirname;
    next()
}, loginRouter);

app.use("/signUp", (req, res, next)=>{
    req.__dirname = __dirname;
    next()
}, signupRouter);

app.use("/product", (req, res, next)=>{
    req.__dirname = __dirname;
    next()
}, productRouter);






app.use((req, res)=>{
    res.status(404).json({message: "The endpoint is not available"});
})

let config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST_NAME
}

app.listen(config, ()=>{
    console.log(`Server running at ${process.env.EXPRESS_PROTOCOL}${config.host}:${config.port}`);
});

