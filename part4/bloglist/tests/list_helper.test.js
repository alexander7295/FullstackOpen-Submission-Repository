const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { list1, list2, list3, listWithOneBlog, biggerList } = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

// const list1 = {
//   _id: '5a422aa71b54a676234d17f8',
//   title: 'Go To Statement Considered Harmful',
//   author: 'Edsger W. Dijkstra',
//   url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
//   likes: 10,
//   __v: 0
// }
  
// const list2 = {
//   _id: '2a422aa71b54a676234d17f8',
//   title: 'abc',
//   author: 'aaa',
//   url: 'url1',
//   likes: 20,
//   __v: 0
// }

// const list3 = {
//   _id: '3a422aa71b54a676234d17f8',
//   title: 'aaa',
//   author: 'aaa',
//   url: 'url2',
//   likes: 30,
//   __v: 0
// }

// const listWithOneBlog = [list1]
// const biggerList = [list1, list2, list3]

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 10)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(biggerList)
    assert.strictEqual(result, 60)
  })
})

describe('favorite blog', () => {
  test('of an empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, null)
  })

  test('of a list with one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, list1)
  })

  test('of a bigger list with multiple blogs', () => {
    const result = listHelper.favoriteBlog(biggerList)
    assert.deepStrictEqual(result, list3)
  })
})

describe('most blogs', () => {
  test('of an empty list is null', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, null)
  })

  test('of a list with one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result, {author:'Edsger W. Dijkstra', blogs:1})
  })

  test('of a list with multiple blogs', () => {
    const result = listHelper.mostBlogs(biggerList)
    assert.deepStrictEqual(result, {author:'aaa', blogs:2})
  })
})

describe('most likes', () => {
  test('of an empty list is null', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, null)
  })

  test('of a list with one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', likes: 10 })
  })

  test('of a list with multiple blogs', () => {
    const result = listHelper.mostLikes(biggerList)
    assert.deepStrictEqual(result, { author: 'aaa', likes: 50 })
  })
})