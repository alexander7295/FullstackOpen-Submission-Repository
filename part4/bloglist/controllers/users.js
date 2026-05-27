const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const allUsers = await User.find({})
  response.status(200).json(allUsers)
})

userRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    password: hashedPassword,
    name
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter