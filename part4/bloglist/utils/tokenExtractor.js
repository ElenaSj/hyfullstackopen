const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request.token = authorization.replace('Bearer ', '')
      console.log("authorization", authorization)
      console.log("request token", request.token)
    }
  
    next()
}

module.exports = tokenExtractor

