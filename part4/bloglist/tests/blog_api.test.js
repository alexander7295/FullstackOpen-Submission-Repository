const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.biggerList)
})

test('the correct amount of blogs are returned in JSON', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, helper.biggerList.length)
})

test('unique identifier of a blog is id', async () => {
  const blogs = await helper.blogsInDb()
  assert(blogs[0].id)
  assert.strictEqual(blogs[0]._id, undefined)
})

test('posting to database works correctly', async () => {
  const newBlog = {
    title: 'abc123',
    author: 'abc123',
    url: 'abc123',
    likes: 50,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.biggerList.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes('abc123'))
})

after(async () => {
  await mongoose.connection.close()
})