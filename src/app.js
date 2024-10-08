require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const cors = require('cors');
// const bodyParser = require('body-parser');
const app = express();
const favicon = require('serve-favicon');
const path = require('path');

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: "*",
    credentials: true // Replace with your actual client origin
        // optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

app.use(favicon(path.join(__dirname, 'public', 'screenshot_1727238291.png')));

// init Database
require('./dbs/init.mongodb');
// const initRedis = require('./dbs/init.redis');

// initRedis.initRedis();


// init routes

app.use('/', require('./routes'));

// handling Errors

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        // stack: error.stack,
        message: error.message || 'Internal Server Error',
    })
});

module.exports = app;


// morgan in ra log khi người dùng request
/**
 * 5 chế độ: dev
 * combined
 * short
 * common
 * tiny
 */
// helmet bảo vệ thông tin riêng tư, không hiện ra công nghệ đang dùng
// compression giảm dung lượng của 1 lần request