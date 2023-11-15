const logger = require('./logger')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint!' })
}

const errorHandler = (error, request, response, next) => {
logger.error(error.message)

if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
} else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
} else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({error: "token missing or invalid"})
} else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
        error: "token expired"
    })
}

next(error)
}

const getTokenFrom = request => {
    const authorization = request.get("Authorization")
    if (authorization && authorization.startsWith("bearer ")) {
        return authorization.replace("bearer ", "")
    } else {
        return null
    }
    
}

const tokenExtractor = ( request, response, next ) => {
    request.token = getTokenFrom(request)
    next()
}

const userExtractor = async ( request, response, next ) => {
    const token = getTokenFrom(request)
    console.log(token)

    if (token) {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: "token is invalid"})
        }
        request.user = await User.findById(decodedToken.id)
    }

    next()
}

module.exports = {
requestLogger,
unknownEndpoint,
errorHandler,
userExtractor,
tokenExtractor,
}
