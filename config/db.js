/**
 * Name: Database Configatation
 * Descriptions: This module provide configuration and connection method for database
 * Author: Moidul Hasan Khan
 * Date: 02 September 2022
 */


// Dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// config environment path
dotenv.config({
    path: './config.env'
});

// module scafolding
const database = {};

// bind db url with password
const url = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// Connect the database
database.connect = () => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(con => {
        console.log('DB connection Successfully!');
    });
}


// export module
module.exports = database;