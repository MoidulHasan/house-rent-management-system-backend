/**
 * Name: Logger
 * Description: This module provide loging functionalities for better debuging
 * Author: Moidul Hasan Khan
 * Date: 02/09/2022
 */

// Dependencies
const { createLogger, format, transports } = require('winston');


// module scafolding
const logger = (filename) => {
    return createLogger({
        transports:
            new transports.File({
                filename: `./logs/${filename}.log`,
                format: format.combine(
                    format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                    format.align(),
                    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
                )
            }),
    });
}

module.exports = logger;
