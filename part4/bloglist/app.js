const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const errorHandler = require('./utils/errorHandler')
const tokenExtractor = require('./utils/tokenExtractor')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('Connecting to database')

mongoose.connect(config.MONGODB_URI)
    .then(() => logger.info('Connected to MongoDB'))
    .catch(error => logger.error('Error connecting to MongoDB:', error.message))

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)

module.exports = app