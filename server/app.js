const express = require('express');
const { ObjectId } = require('mongodb');
const { connectMongodb } = require('./helpers/db');
const app = express();

app.use(express.json());

app.get("/", async(req, res)=>{
    const collection = await connectMongodb(); 
    res.status(200).send(await collection.find({}).toArray());
})


app.delete("/:id", async(req, res)=>{
    const collection = await connectMongodb();
    let { id } = req.params;
    res.status(400).send(await collection.deleteOne({_id: ObjectId(id)}));
})

app.post("/", async(req, res) => {
    const collection = await connectMongodb();
    let data = await req.body;

    res.status(201).send(await collection.insertOne(data));

});


app.delete("/:id", async(req, res)=>{
    const collection = await connectMongodb();
    let data = req.body;
    let { id } = req.params;

    res.status(201).send(await collection.updateOne({_id: ObjectId(id)}, {$set: data}));
})


let config = {
    port: process.env.EXPRESS_PORT,
    host: process.env.EXPRESS_HOST_NAME
}

app.listen(config, ()=>{
    console.log(`Server running at ${process.env.EXPRESS_PROTOCOL}${config.host}:${config.port}`);
});

