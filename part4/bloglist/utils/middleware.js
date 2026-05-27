const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const tokenExtractor = (request, response, next) => {
  let authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    authorization = authorization.replace('Bearer ', '')
  }
  else {
    authorization = null
  }

  request.token = authorization
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({error: "Invalid token"})
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({error: "User does not exist"})
  }

  request.user = user
  next()
}

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:', request.path)
  logger.info('Body:', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: "Malformatted id" })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'Invalid token'
    })
  }
  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'Token expired'
    })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler
}