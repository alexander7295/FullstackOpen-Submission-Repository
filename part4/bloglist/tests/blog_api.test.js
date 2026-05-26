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

after(async () => {
  await mongoose.connection.close()
})