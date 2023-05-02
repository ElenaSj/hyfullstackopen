const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(result)
})

blogsRouter.post('/', async (request, response) => {
    let body = request.body
    if (!body.title || !body.url) return response.status(400).send()
    if (!body.likes) body=({...body, likes:0})
    const user = await User.findById(body.user)
    const blog = new Blog(body)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  if (!request.body.url || !request.body.title) return response.status(400).send()
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true, context: 'query' } )
  response.json(result)
})

module.exports = blogsRouter