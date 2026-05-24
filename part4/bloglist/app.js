const config = require('./utils/config')
const express = require('express')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

const mongoUrl = config.MONGODB_URI
logger.info('Attempting to connecting to MongoDB')
mongoose.connect(mongoUrl, { family: 4 })
  .then(() => {
    logger.info('Connected to MongoDB successfully')
  })
  .catch((error) => {
    logger.error('Error connection to MongoDB:', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app