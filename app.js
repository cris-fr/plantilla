const express = require('express');
const userRouter = require('./server/router/userRouter');
const { join } = require('path');
const app = express();

app.use('/css', express.static(join(__dirname, process.env.EXPRESS_STATIC, 'css')))
app.use('/js', express.static(join(__dirname, process.env.EXPRESS_STATIC, 'js')))
app.use('/storage', express.static(join(__dirname, process.env.EXPRESS_STATIC, 'storage')))

app.get("/", (req, res)=>{
    res.sendFile(join(__dirname, process.env.EXPRESS_STATIC, '/index.html'));
})

app.use("/user", (req, res, next)=>{
    req.__dirname = __dirname;
    next()
} ,userRouter);


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

