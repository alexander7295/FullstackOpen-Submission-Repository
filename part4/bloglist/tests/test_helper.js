const Blog = require('../models/blog')
// const User = require('../models/user')
// const bcrypt = require('bcrypt')

const list1 = {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
  likes: 10,
  __v: 0
}
  
const list2 = {
  _id: '2a422aa71b54a676234d17f8',
  title: 'abc',
  author: 'aaa',
  url: 'url1',
  likes: 20,
  __v: 0
}

const list3 = {
  _id: '3a422aa71b54a676234d17f8',
  title: 'aaa',
  author: 'aaa',
  url: 'url2',
  likes: 30,
  __v: 0
}

const listWithOneBlog = [list1]
const biggerList = [list1, list2, list3]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  list1, list2, list3, listWithOneBlog, biggerList, blogsInDb
}