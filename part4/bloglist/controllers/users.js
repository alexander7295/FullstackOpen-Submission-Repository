const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const allUsers = await User.find({}).populate('blogs', {title:1, author:1, url:1, likes:1})
  response.status(200).json(allUsers)
})

userRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  if (!password) {
    return response.status(400).json({error:'Password is missing'})
  }
  else if (password.length < 3) {
    return response.status(400).json({error:'Password length is less than 3'})
  }

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