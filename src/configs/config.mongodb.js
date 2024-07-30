'use strict'

// level 01
const dev = {
    app: {
        port: process.env.DEV_APP_PORT || 3002
    },
    db: {
        host: process.env.DEV_DB_HOST || '127.0.0.1',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'BlogDbMobile'
    }
}


const pro = {
    app: {
        port: process.env.PRO_APP_PORT || 3000
    },
    db: {
        host: process.env.PRO_DB_HOST || 'localhost',
        port: process.env.PRO_DB_PORT || 27017,
        name: process.env.PRO_DB_NAME || 'BlogDbMobile'
    }
}

const configs = { dev, pro }

const env = process.env.NODE_ENV || 'dev'


module.exports = configs[env]