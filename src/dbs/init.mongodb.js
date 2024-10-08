'use strict'

const mongoose = require('mongoose');


const {db: {host, port, name}} =  require('../configs/config.mongodb')


const connectString = `mongodb://${host}:${port}/${name}`;


console.log(connectString);
class Database {
    constructor() {
        this.connect();
    }
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
        }
        mongoose.connect(connectString, {
            maxPoolSize: 50,
        }).then(() => {
            console.log('MongoDB Connected');
        }).catch(err => {
            console.log(err, 'err');
        })
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongoDb = Database.getInstance();
module.exports = instanceMongoDb