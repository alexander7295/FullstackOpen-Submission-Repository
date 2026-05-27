const assert = require('node:assert')
const {test, describe, beforeEach, after} = require('node:test')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('User creation', () => {
  test('Users with no username are not created', async () => {
    const userObject = {
      password: '1234',
      name: 'test'
    }

    const result = await api
      .post('/api/users')
      .send(userObject)
      .expect(400)

    assert.strictEqual(result.body.error, 'User validation failed: username: Path `username` is required.')
  })

  test('Users with no password are not created', async () => {
    const userObject = {
      username: 'test',
      name: 'test'
    }

    const result = await api
      .post('/api/users')
      .send(userObject)
      .expect(400)
    
    assert.strictEqual(result.body.error, 'Password is missing')
  })

  test('Users with a username of length < 3 are not created', async () => {
    const userObject = {
      username: '12',
      password: "1234",
      name: 'test'
    }

    const result = await api
      .post('/api/users')
      .send(userObject)
      .expect(400)
    
    assert.strictEqual(result.body.error, 'User validation failed: username: Path `username` (`12`, length 2) is shorter than the minimum allowed length (3).')
  })

  test('Users with a username of length < 3 are not created', async () => {
    const userObject = {
      username: '1234',
      password: "12",
      name: 'test'
    }

    const result = await api
      .post('/api/users')
      .send(userObject)
      .expect(400)
    
    assert.strictEqual(result.body.error, 'Password length is less than 3')
  })

  test('Users with a non-unique username are not created', async () => {
    const userObject = {
      username: '1234',
      password: '1234',
      name: 'test'
    }

    await api
      .post('/api/users')
      .send(userObject)
      .expect(201)
    
    const result = await api
      .post('/api/users')
      .send(userObject)
      .expect(400)
    
    assert.strictEqual(result.body.error, 'expected `username` to be unique')
  })
})


after(async () => {
  await mongoose.connection.close()
})