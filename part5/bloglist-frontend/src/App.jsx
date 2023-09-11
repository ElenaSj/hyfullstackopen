import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'

const Success = ({message}) => {
  if (message) {
    return (
      <div className='success'>
        {message}
      </div>
    )
  }
}

const Error = ({message}) => {
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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const createBlog = async (event) => {
    event.preventDefault()
    let newBlog = {
      'title': title,
      'author': author,
      'url': url
    }

    try {
    const blog = await blogService.create(newBlog)
    setBlogs(blogs.concat(blog))
    setSuccesMessage(`Added new blog ${title} by ${author}`)
      setTimeout(() => {
        setSuccesMessage('')
      }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
    } catch (exception) {
      setErrorMessage('Failed to add blog. Title and url are mandatory fields')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setSuccesMessage('Logged out!')
      setTimeout(() => {
        setSuccesMessage('')
      }, 5000)
  }

  return (
    <div>
      <Success message = {succesMessage} />
      <Error message = {errorMessage} />
      {user &&
      <div>
      <h2>blogs</h2>
      <p>{user.name} is logged in</p><button onClick={handleLogout}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>new blog</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input type='text' value={title} onChange={ev=>setTitle(ev.target.value)}/>
        </div>
        <div>
          author:
          <input type='text' value={author} onChange={ev=>setAuthor(ev.target.value)}/>
        </div>
        <div>
          url:
          <input type='text' value={url} onChange={ev=>setUrl(ev.target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
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