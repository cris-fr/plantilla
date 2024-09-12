const express = require('express');
const { connectMongodb } = require('../helpers/db');
const { ObjectId } = require('mongodb');

const user = express();

user.get("/", async(req, res)=>{
    const collection = await connectMongodb(); 
    res.status(200).send(await collection.find({}).toArray());
})


user.delete("/:id", async(req, res)=>{
    const collection = await connectMongodb();
    let { id } = req.params;
    res.status(400).send(await collection.deleteOne({_id: ObjectId(id)}));
})

user.post("/", express.json(), async(req, res) => {
    const collection = await connectMongodb();
    let data = await req.body;

    res.status(201).send(await collection.insertOne(data));

});


user.delete("/:id", express.json(), async(req, res)=>{
    const collection = await connectMongodb();
    let data = req.body;
    let { id } = req.params;

    res.status(201).send(await collection.updateOne({_id: ObjectId(id)}, {$set: data}));
})

module.exports = user;