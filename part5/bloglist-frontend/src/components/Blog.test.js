import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url or number of likes by default', () => {
  const blog = {
    'title': 'Kavioliitossa',
    'author': 'Katja Ståhl',
    'url': 'www.kavioliitto.fi',
    'likes': 0,
    'user': {
      'username': 'test',
      'name': 'Reija Hyyppälä-Kaskela',
      'id': '6451fdbe7de67a49e63499ea'
    },
    'id': '64f8561f4a3890bf3eaf2932'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Kavioliitossa, Katja Ståhl'
  )
  expect(div).not.toHaveTextContent(
    'www.kavioliitto.fi'
  )
  expect(div).not.toHaveTextContent(
    '0'
  )
})