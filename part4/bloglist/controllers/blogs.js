const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs)
  // })
  const allBlogs = await Blog.find({})
  return response.json(allBlogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  // blog.save().then((result) => {
  //   response.status(201).json(result)
  // })

  const savedBlog = await blog.save()
  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blogToUpdate = await Blog.findById(request.params.id)

  if (!blogToUpdate) {
    return response.status(404).end()
  }

  blogToUpdate.title = title ? title : blogToUpdate.title
  blogToUpdate.author = author ? author : blogToUpdate.author
  blogToUpdate.url = url ? url : blogToUpdate.url
  blogToUpdate.likes = likes ? likes : blogToUpdate.likes
  
  const updatedBlog = await blogToUpdate.save()
  return response.status(200).json(updatedBlog)
})

module.exports = blogsRouter