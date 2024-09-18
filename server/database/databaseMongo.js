const { MongoClient } = require('mongodb');
module.exports = class connectMongodb {
    static instanceConnect;
    db;
    con;
    user;
    #password;

    constructor({ user, pwd } = {user: process.env.MONGO_USER, pwd: process.env.MONGO_PSW}) {
        if(connectMongodb.instanceConnect) {
            return connectMongodb.instanceConnect;
        }
        this.user = user;
        this.setPassword = pwd;
        connectMongodb.instanceConnect = this;
    }

    destroyer(user, pwd) {
        connectMongodb.instanceConnect.setUserser = user;
        connectMongodb.instanceConnect.setPassword = pwd;
    }

    async connectOpen() {
        try {
            this.con = new MongoClient(`${process.env.MONGO_PROTOCOL}${this.getUser()}:${this.getPassword()}@${process.env.MONGO_HOST_NAME}:${process.env.MONGO_PORT}`, { useNewUrlParser: true, useUnifiedTopology: true });
            await this.con.connect();
            this.db = this.con.db(process.env.MONGO_DB_NAME);
        } catch (error) {
            this.con = undefined;
            connectMongodb.instanceConnect = undefined;
            throw new Error(JSON.stringify({ status: 500, message: "Error connecting to database", error }));
        }
    }

    set setUser(user) {
        this.user = user;
    }

    get getUser() {
        return this.user;
    }

    set setPassword(pwd) {
        this.#password = pwd;
    }

    get getPassword() {
        return this.#password;
    }
};