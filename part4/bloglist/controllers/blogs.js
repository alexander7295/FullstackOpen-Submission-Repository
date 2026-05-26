const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs)
  // })
  const allBlogs = await Blog.find({})
  return response.json(allBlogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  // blog.save().then((result) => {
  //   response.status(201).json(result)
  // })

  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
})

module.exports = blogsRouter