// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
    try {
        const {username, password} = request.body
    const user = await User.findOne({username})
    console.log("Found user", user)
    // const passwordCorrect = user[0] === null ? false : await bcrypt.compare(password, user.passwordHash)
    // if (!(user[0] && passwordCorrect)) {
    //     return response.status(401).json({error: "invalid username or password"})
    // }
    // const userForToken = {
    //     username: user.username,
    //     id: user._id,
    // }


    // const token = jwt.sign(userForToken, process.env.JWT_SECRET, {expiresIn: 60*60})
    // token would be added to send({token, ....})
    response.status(200).send({username: user.username, name: user.name})
    } catch(error) {
        console.log("ERRO", error)
        response.status(401).send({error: error})
    }
})

module.exports = loginRouter