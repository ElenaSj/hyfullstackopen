const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if (!password) {
        response.statusMessage = 'password is required'
        return response.status(400).json({ error: 'password is required' }).send()
    }
        if (password.length<3) {
        response.statusMessage= 'password must be at least 3 characters'        
        return response.status(400).json({ error: 'password must be at least 3 characters' }).send()
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})


module.exports = usersRouter