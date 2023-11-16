const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()


const User = require('../models/User')


usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    // const saltRounds = 10 
    // const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        password,
       // passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)

})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('diaryentries', {title: 1, content: 1, date: 1})

    response.json(users)
})

module.exports = usersRouter