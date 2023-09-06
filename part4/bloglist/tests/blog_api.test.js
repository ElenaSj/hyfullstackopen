const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    }
]

const newUser = {
    'name': 'test',
    'username': 'test',
    'password': 'test'
}

const user = {
    'username': 'test',
    'password': 'test'
}

beforeEach(async () => {
    await Blog.deleteMany({})
    let blog = new Blog(initialBlogs[0])
    await blog.save()
    blog = new Blog(initialBlogs[1])
    await blog.save()
})

describe('get blogs', () => {
    test('blogs are returned as json', async () => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('there is a correct number of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2)
    })
    test('blogs have id property', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})

describe('adding a new blog', () => {

    beforeAll(async () => {
        await User.deleteMany({})
        await api.post('/api/users').send(newUser)
    })

    test('undefined likes default to 0', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }
        const loginResponse = await api.post('/api/login').send(user)
        let headers = {
            'Authorization': `Bearer ${loginResponse.body.token}`
        }
        const response = await api.post('/api/blogs').send(newBlog).set(headers)
        expect(response.body.likes).toBe(0)
    })
    test('missing title fails with 400', async () => {
        const newBlog = {
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }
        const loginResponse = await api.post('/api/login').send(user)
        let headers = {
            'Authorization': `Bearer ${loginResponse.body.token}`
        }
        await api.post('/api/blogs').send(newBlog).set(headers).expect(400)
    })
    test('missing url fails with 400', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
        }
        const loginResponse = await api.post('/api/login').send(user)
        let headers = {
            'Authorization': `Bearer ${loginResponse.body.token}`
        }
        await api.post('/api/blogs').send(newBlog).set(headers).expect(400)
    })
    test('bad token fails with 401', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }
        let headers = {
            'Authorization': `Bearer `
        }
        await api.post('/api/blogs').send(newBlog).set(headers).expect(401)
    })
})

describe('deleting a blog', () => {
    test('deleting a blog with a valid id succeeds', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToDelete = blogsAtStart.body[0]

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

        const blogsAtEnd = await api.get('/api/blogs')

        expect(blogsAtEnd.body).toHaveLength(blogsAtStart.body.length-1)
        const titles = blogsAtEnd.body.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

describe('updating a blog', () => {
    test('updating blog likes succeeds', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToUpdate = blogsAtStart.body[0]
        const newLikes = blogToUpdate.likes+1
        const updatedBlog = ({...blogToUpdate,likes:newLikes})
        const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog)
        expect(response.body.likes).toBe(newLikes)
    })
    test('updating a blog without url fails with 400', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToUpdate = blogsAtStart.body[0]
        const updatedBlog = ({...blogToUpdate,url:null})
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(400)
    })
    test('updating a blog without title fails with 400', async () => {
        const blogsAtStart = await api.get('/api/blogs')
        const blogToUpdate = blogsAtStart.body[0]
        const updatedBlog = ({...blogToUpdate,title:null})
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(400)
    })
})

afterAll(async () => {
  await mongoose.connection.close()
})