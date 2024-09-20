const connectMongodb = require('../database/databaseMongo');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');



module.exports = class Product extends connectMongodb {
    constructor(data){
        super(data);
    }
    async findCollection(){
        try{
            await this.connectOpen();
            const collection = this.db.collection('product');
            let res = await collection.find().toArray();
            if(!res.length) throw new ValidationError(JSON.stringify({status: 404, message: "Product not fetched", err}))
            return await collection.find().toArray();
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Product not fetched", err}));
        }
    }

    async insertCollection(data){
        try{
            await this.connectOpen();
            const collection = this.db.collection('product');
            return await collection.insertOne(data);
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Product not created", err}));
        }
    }


    async uploadFileByProduct(files, __dirname){
        try{
            let file = files.product_image;
            let fileBuffer = file.data;
            const filePath = path.join(__dirname, process.env.EXPRESS_STATIC, '/storage/img', file.name);
            fs.writeFile(filePath, fileBuffer, (err) => {
                if(err) throw new Error(JSON.stringify({status: 415, message: "Error uploading file as image format", err}));
                return {status: 201, message: "File uploaded successfully", data: filePath};
            })
        } catch (error){
            throw new Error(JSON.stringify({status: 500, message: "Error uploading the file, the server denied uploading the file.", error}));
        }
    }

    
    async updateAndInsertCollection(id, data){
        try{
            await this.connectOpen();
            const collection = this.db.collection('product');
            return await collection.updateOne({_id: new ObjectId(id)}, {$set: data});
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Product not updated", err}));
        }
    }

    async deleteByIdCollection(id){
        try{
            await this.connectOpen();
            const collection = this.db.collection('product');
            return await collection.deleteOne({_id: new ObjectId(id)});
        }catch(err){
            throw new Error(JSON.stringify({status: 500, message: "Product not deleted", err}));
        }
    }

}