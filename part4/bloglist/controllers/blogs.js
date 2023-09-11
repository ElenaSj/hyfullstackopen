const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(result)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    let body = request.body
    const user = request.user
    if (!body.title || !body.url) return response.status(400).send()
    if (!user) return response.status(401).send()
    if (!body.likes) body=({...body, likes:0})
    
    body=({...body, user: user._id})

    const blog = new Blog(body)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if (blog.user.toString() === user.id) {
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'user is not permitted to delete this blog'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  if (!request.body.url || !request.body.title) return response.status(400).send()
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, context: 'query' } )
  response.json(result)
})

module.exports = blogsRouter