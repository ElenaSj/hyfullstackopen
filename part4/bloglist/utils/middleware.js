const jwt = require('jsonwebtoken')

const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') console.log(...params)
}
    
const error = (...params) => {
   if (process.env.NODE_ENV !== 'test') console.error(...params)
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
  }

  if (error.name === 'MongoServerError' && error.code===11000) {
      return response.status(400).json({ error: 'username is already in use' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request["token"] = authorization.replace('Bearer ', '')
    }
  
    next()
}



    
  module.exports = {
    info, error, errorHandler, tokenExtractor
  }