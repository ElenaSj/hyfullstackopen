import { useState } from 'react'
import PropTypes from 'prop-types'


const NewBlogForm = ({ createBlog }) => {

  NewBlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const create = event => {
    event.preventDefault()
    let newBlog = {
      'title': title,
      'author': author,
      'url': url
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>new blog</h2>
      <form onSubmit={create}>
        <div>
          title:
          <input type='text' placeholder='Blog title' value={title} onChange={ev => setTitle(ev.target.value)}/>
        </div>
        <div>
          author:
          <input type='text' placeholder='Blog author' value={author} onChange={ev => setAuthor(ev.target.value)}/>
        </div>
        <div>
          url:
          <input type='text' placeholder='Blog url' value={url} onChange={ev => setUrl(ev.target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm