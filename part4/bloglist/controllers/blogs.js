const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { userExtractor } = require('../utils/middleware')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  // Blog.find({}).then((blogs) => {
  //   response.json(blogs)
  // })
  const allBlogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  return response.json(allBlogs)
})

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const blog = new Blog(request.body)
  const user = request.user

  blog.user = user._id
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  return response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  
  const deletedBlog = await Blog.findOneAndDelete({
    _id: request.params.id,
    user: user._id
  })

  if (!deletedBlog) {
    return response.status(401).json({ error: 'Blog not found or user not authorized' })
  }

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