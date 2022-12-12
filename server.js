/**
 * Name: Server
 * Description: This module provide the rest api server
 * Author: Moidul Hasan Khan
 * Date: 01 September,  2022
 */


// Dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const logger = require('./utils/logger');
const database = require('./config/db');


// configure database
const Logger = logger('server');

// config environment
dotenv.config({
    path: './config.env'
});


// Process un caught exception
process.on('uncaughtException', err => {
    Logger.error('UNCAUGHT EXCEPTION!!! shutting down...');
    Logger.error(err.name, err.message);
    process.exit(1);
});

// const connect database
database.connect();

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    Logger.info(`Application is running on port ${port}, url: localhost:${port}`);
    console.log(`Application is running on port ${port}, url: http://localhost:${port}`)
});

// Handle unhandled rejection
process.on('unhandledRejection', err => {
    Logger.error('UNHANDLED REJECTION!!!  shutting down ...');
    Logger.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});