const express = require('express');
const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    let data = req.params;
    res.json(data);
})

app.post("/users", express.json(), (req, res)=>{
    let data = req.body;
    res.status(201).json(data);
})

let config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST_NAME
}
app.listen(config, ()=>{
    console.log(`Server running at ${process.env.EXPRESS_PROTOCOL}${config.host}:${config.port}`);
});

