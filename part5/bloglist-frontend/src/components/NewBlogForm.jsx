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
  }

  return(
    <div>
      <h2>new blog</h2>
      <form onSubmit={create}>
        <div>
          title:
          <input type='text' value={title} onChange={ev => setTitle(ev.target.value)}/>
        </div>
        <div>
          author:
          <input type='text' value={author} onChange={ev => setAuthor(ev.target.value)}/>
        </div>
        <div>
          url:
          <input type='text' value={url} onChange={ev => setUrl(ev.target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm