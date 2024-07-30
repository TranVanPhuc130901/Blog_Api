const redis = require('redis');
const { RedisErrorResponse } = require('../core/error.response');

// // Create a Redis client
// const client = redis.createClient({
//     url: `redis://${process.env.REDIS_URL}:${process.env.REDIS_PORT}` // Replace with your Redis server URL if different
// });

// // Connect to Redis
// // client.connect();

// client.ping((err, result) => {
//     console.log(result)
// })

// // Handle connection events
// client.on('connect', () => {
//     console.log('Connected to Redis');
// });

// client.on('error', (err) => {
//     console.error('Redis error:', err);
// });

// // Example usage: Set and get a value
// (async () => {
//     try {
//         await client.set('key', 'value');
//         const value = await client.get('key');
//         console.log('Value:', value);
//     } catch (err) {
//         console.error('Error:', err);
//     } finally {
//         client.quit(); // Close the connection
//     }
// })();

let client = {}, statusConnectRedis = {
    CONNECT: 'connect',
    END: 'end',
    RECONNECT: 'reconnecting',
    ERROR: 'error'
}, connectionTimeout;

const REDIS_CONNECT_TIMEOUT = 10000, REDIS_CONNECT_MESSAGE = {
    code: -99,
    message : {
        vn:'Redis loi',
        en:'Redis error'
    }
}

const handleTimeError = () => {
    connectionTimeout = setTimeout(() => {
        throw new RedisErrorResponse({
            message: REDIS_CONNECT_MESSAGE.message.vn,
            statusCode: REDIS_CONNECT_MESSAGE.code
        })
    }, REDIS_CONNECT_TIMEOUT)
}

const handleEventConnect = ({
    conectionRedis
}) => {

   conectionRedis.on(statusConnectRedis.CONNECT, () => {
        console.log('Connected to Redis');
        clearTimeout(connectionTimeout);
    })
    conectionRedis.on(statusConnectRedis.END, () => {
        console.log('Disconnected from Redis');
        // connect retry
        handleTimeError();
    })
    conectionRedis.on(statusConnectRedis.RECONNECT, () => {
        console.log('Reconnected to Redis');
        clearTimeout(connectionTimeout);
    })
    conectionRedis.on(statusConnectRedis.ERROR, (err) => {
        console.error('Redis error:', err);
        handleTimeError();
    })
}

const initRedis = () => {
    const intanceRedis = redis.createClient();
    client.intanceConnent = intanceRedis;
    intanceRedis.connect();
    handleEventConnect({
        conectionRedis: intanceRedis
    });
}

const getRedis = () => client

const closeRedis = () => {
    if (client.intanceConnent) {
        client.intanceConnent.quit(); // Đảm bảo đóng kết nối khi không sử dụng nữa
    }
}

module.exports = {
    initRedis,
    getRedis,
    closeRedis
}