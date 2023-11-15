
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request, response) => {
response.status(404).send({ error: 'unknown endpoint!' })
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
unknownEndpoint,
userExtractor,
tokenExtractor,
}

