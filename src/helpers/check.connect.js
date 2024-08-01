'use strict'

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND = 5000;

// count connect
const countConnect = () => {
    const numConnect = mongoose.connections.length;
    console.log( 'numConnect' ,numConnect);
}


// check overload connect
const checkOverloadConnect = () => {
    setInterval(() => {
        const numConnect = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;

        const maxConnections = numCores * 5;


        console.log(`Active connections: ${numConnect}`);
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

        if(numConnect > maxConnections) {
            console.log('Overload connect');
        }
    }, _SECOND) // Monitor every 5 seconds
}

module.exports = {
    countConnect
}