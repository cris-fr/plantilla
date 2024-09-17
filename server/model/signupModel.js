const { connectMongodb } = require('../database/databaseMongo');
const { ObjectId } = require('mongodb');

module.exports = class User {
    async findExistNick(nick){
        try{
            const con = await connectMongodb();
            const collection = con.collection('user');
            let [res] = await collection.find({nick: nick}).project({_id: 1}).toArray();
            if(!res) return {status: 404, message: "User not registered in the database"}
            return {status: 200, message: "User Found", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "User not fetched", err}));
        }
    }

    async findExistEmail(email){
        try{
            const con = await connectMongodb();
            const collection = con.collection('user');
            let [res] = await collection.find({email: email}).project({_id: 1}).toArray();
            if(!res) return {status: 404, message: "Email not registered in the database"}
            return {status: 200, message: "User Found", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "User not fetched", err}));
        }
    }

    async insertCollection(data){
        try{
            const con = await connectMongodb();
            const collection = con.collection('user');
            let res = await collection.insertOne(data);
            return {status: 201, message: "User added succesfully", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "User not fetched", err}));
        }
    }

    async findOneUserByEmail(email, password){
        try{
            const con = await connectMongodb();
            const collection = con.collection('user');
            let [res] = await collection.find({email: email}).project({}).toArray();
            if(!res) return {status: 406, message: "The password is incorrect"}
            return {status: 200, message: "User Found", data: res}
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "User not fetched", err}));
        }
    }

}