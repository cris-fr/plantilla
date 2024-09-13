const { MongoClient } = require("mongodb");
//require('dotenv').config();

const uri = `${process.env.MONGO_PROTOCOL}${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
const client = new MongoClient(uri);

console.log(uri)

// let dbInstance = null;

async function connectMongodb() {
    //if (dbInstance) return dbInstance;

    try {
        await client.connect();
        dbInstance = client.db(process.env.MONGO_DB_NAME);
        return dbInstance;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}

module.exports = { connectMongodb };