const { connectMongodb } = require('../database/databaseMongo');
const { ObjectId } = require('mongodb');



module.exports = class Product {
    async findCollection(){
        try{
            const con = await connectMongodb();
            const collection = con.collection('product');
            let res = await collection.find().toArray();
            if(!res.length) throw new ValidationError(JSON.stringify({status: 404, message: "Product not fetched", err}))
            return await collection.find().toArray();
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Product not fetched", err}));
        }
    }

    async insertCollection(data){
        try{
            const con = await connectMongodb();
            const collection = con.collection('product'); 
            return await collection.insertOne(data);
            console.log(data);
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Product not created", err}));
        }
    }
    
    async updateAndInsertCollection(id, data){
        try{
            const con = await connectMongodb();
            const collection = con.collection('product'); 
            return await collection.updateOne({_id: new ObjectId(id)}, {$set: data});
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Product not updated", err}));
        }
    }

    async deleteByIdCollection(id){
        try{
            const con = await connectMongodb();
            const collection = con.collection('product'); 
            return await collection.deleteOne({_id: new ObjectId(id)});
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Product not deleted", err}));
        }
    }

}