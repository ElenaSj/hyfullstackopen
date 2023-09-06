const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/*const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
*/
blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(result)
})

blogsRouter.post('/', async (request, response) => {
    let body = request.body
    if (!body.title || !body.url) return response.status(400).send()
    if (!body.likes) body=({...body, likes:0})
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    body=({...body, user: user._id})

    const blog = new Blog(body)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() === user.id) {
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'token missing or invalid'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  if (!request.body.url || !request.body.title) return response.status(400).send()
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, context: 'query' } )
  response.json(result)
})

module.exports = blogsRouter