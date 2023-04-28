const Blog = require('../models/blog')
const blogsRouter = require('express').Router()


blogsRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
    response.json(result)

})

blogsRouter.post('/', async (request, response) => {
    let body = request.body
    if (!body.title || !body.url) return response.status(400).send()
    if (!body.likes) body=({...body, likes:0})
    let blog = new Blog(body)
    const result = await blog.save()
    response.status(201).json(result)
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