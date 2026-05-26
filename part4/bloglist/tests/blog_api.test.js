const {test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const { title } = require('node:process')

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

test('requests missing the likes property will default to the value 0', async () => {
  const newBlog = {
    title: 'abcabc',
    author: 'abc',
    url: 'urlabc'
  }

  const result = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(result.body.likes, 0)
})

test('requests missing the title property will return status 400', async () => {
  const newBlog = {
    author: 'abc',
    url: 'urlabc',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('requests missing the url property will return status 400', async () => {
  const newBlog = {
    title: 'abc',
    author: 'abc',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('delete by id works correctly', async () => {
  const idToDelete = helper.list1._id

  await api
    .delete(`/api/blogs/${idToDelete}`)
    .expect(204)
  
  const blogsAfterDeletion = await helper.blogsInDb()
  const idsAfterDeletion = blogsAfterDeletion.map(blog => blog.id)
  
  assert(!idsAfterDeletion.includes(idToDelete))
})

test('update by id works correctly', async () => {
  const blogToUpdate = helper.list1
  blogToUpdate.likes = 1000

  await api
    .put(`/api/blogs/${blogToUpdate._id}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAfterUpdate = await helper.blogsInDb()
  const updatedBlog = blogsAfterUpdate.filter(blog => blog.id === blogToUpdate._id)[0]
  
  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes)
})

after(async () => {
  await mongoose.connection.close()
})