const {MongoClient} = require('mongodb');

exports.connectMongodb = async()=>{
    const url = `${process.env.MONGO_PROTOCOL}${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
    const client = new MongoClient.connect(url);
    await client.connect();
    const db = client.db(process.env.MONGO_DB_NAME);
    const collection = db.collection("user");
    return collection;
}