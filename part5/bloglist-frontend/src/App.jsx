import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import './app.css'

const Success = ({ message }) => {
  if (message) {
    return (
      <div className='success'>
        {message}
      </div>
    )
  }
}

const Error = ({ message }) => {
  if (message) {
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccesMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      let blog = await blogService.create(newBlog)
      blog = ({ ...blog, user: user })
      setBlogs(blogs.concat(blog))
      setSuccesMessage(`Added new blog ${blog.title}`)
      setTimeout(() => {
        setSuccesMessage('')
      }, 5000)
    } catch (exception) {
      setErrorMessage('Failed to add blog. Please check that you have filled in title and url')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const updateBlog = async (updatedBlog) => {
    updatedBlog = ({ ...updatedBlog, user: updatedBlog.user.id, likes: updatedBlog.likes+1 })
    blogService.update(updatedBlog.id, updatedBlog)
    const newBlogs = blogs.map(blog => {
      if (blog.id === updatedBlog.id) return ({ ...blog, likes: blog.likes+1 })
      else return blog
    })
    setBlogs(newBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in as', username)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccesMessage(`Welcome back ${user.name}!`)
      setTimeout(() => {
        setSuccesMessage('')
      }, 5000)
    } catch (exception) {
      console.log('something went wrong')
      setErrorMessage('Wrong credentials, try again')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const remove = async (blog) => {
    if(window.confirm(`Do you want to delete blog ${blog.title}?`)) {
      await blogService.remove(blog.id)
      const newBlogs = blogs.filter(a => a.id !== blog.id)
      setBlogs(newBlogs)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setSuccesMessage('Logged out!')
    setTimeout(() => {
      setSuccesMessage('')
    }, 5000)
  }

  let sortedBlogs = blogs.sort((a, b) => a.likes - b.likes).toReversed()

  return (
    <div>
      <Success message = {succesMessage} />
      <Error message = {errorMessage} />
      {user &&
      <div>
        <p>{user.name} is logged in</p><button onClick={handleLogout}>logout</button>
        <h2>blogs</h2>
        <Togglable buttonLabel='New blog' ref={blogFormRef}>
          <NewBlogForm createBlog={createBlog} />
        </Togglable>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} remove={remove} />
        )}
      </div>
      }
      {!user &&
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      }
    </div>
  )
}

export default App