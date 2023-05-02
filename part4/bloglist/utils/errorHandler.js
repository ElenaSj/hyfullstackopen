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

module.exports = errorHandler
