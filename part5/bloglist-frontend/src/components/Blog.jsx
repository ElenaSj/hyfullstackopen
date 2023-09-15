import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, toggleView] = useState(false)

  const blogStyle = {
    
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5,
    background:'FloralWhite'
  }

  return (
  <div style={blogStyle}>
    {!showDetails &&
    <div>
      {blog.title}, {blog.author}<button onClick={()=>toggleView(!showDetails)}>view</button>
    </div> 
    }
    {showDetails &&
    <div>
      <h3>{blog.title}</h3>
      <p>Blogger: {blog.author}</p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={()=>updateBlog(blog)}>like</button></p>
      <p>Added by user {blog.user.name}</p>
      <button onClick={()=>toggleView(!showDetails)}>hide</button>
    </div>
    }
  </div>
  )
}
export default Blog