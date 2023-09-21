import { useState } from 'react'

const Blog = ({ blog, updateBlog, user, remove }) => {
  const [showDetails, toggleView] = useState(false)

  const blogStyle = {

    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5,
    background:'FloralWhite'
  }

  return (
    <div style={blogStyle} className='blog'>
      {!showDetails &&
    <div>
      {blog.title}, {blog.author}<button onClick={() => toggleView(!showDetails)}>view</button>
    </div>
      }
      {showDetails &&
    <div>
      <h3>{blog.title}</h3><button onClick={() => toggleView(!showDetails)}>hide</button>
      <p>Blogger: {blog.author}</p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={() => updateBlog(blog)}>like</button></p>
      <p>Added by user {blog.user.name}</p>
    </div>
      }
      {showDetails && user.username === blog.user.username &&
    <div>
      <button onClick={() => remove(blog)}>Remove</button>
    </div>
      }
    </div>
  )
}
export default Blog