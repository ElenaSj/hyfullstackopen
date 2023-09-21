import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

test('NewBlogForm calls event handler with right details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<NewBlogForm createBlog={createBlog} />)

  const createbutton = screen.getByText('create')
  const titleInput = screen.getByPlaceholderText('Blog title')
  const authorInput = screen.getByPlaceholderText('Blog author')
  const urlInput = screen.getByPlaceholderText('Blog url')

  await user.type(titleInput, 'The blogs title')
  await user.type(authorInput, 'The blogs author')
  await user.type(urlInput, 'The blogs url')
  await user.click(createbutton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog.mock.calls[0][0].title).toBe('The blogs title')
  expect(createBlog.mock.calls[0][0].author).toBe('The blogs author')
  expect(createBlog.mock.calls[0][0].url).toBe('The blogs url')
})