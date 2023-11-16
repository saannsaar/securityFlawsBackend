const winston = require('winston')

// Should use logger to log relevant information for example about login failures into a logfile:

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
  })

  module.exports = { logger }
