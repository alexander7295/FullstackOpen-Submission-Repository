const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  
  const result = _.chain(blogs)
  .countBy('author')
  .toPairs()
  .maxBy(1)
  .value()

  return { author: result[0], blogs: result[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}