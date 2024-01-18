import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { gql, useQuery, useMutation } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String]
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author
    }
  }
`

const UPDATE_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  })

  const [changeBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const newBook = (title, author, published, genres) => {
    createBook({ variables: { title, author, published, genres } })
  }

  const updateAuthor = (name, setBornTo) => {
    changeBirthyear({ variables: { name, setBornTo } })
  }

  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={resultAuthors.data.allAuthors}
        updateAuthor={updateAuthor}
      />

      <Books show={page === 'books'} books={resultBooks.data.allBooks} />

      <NewBook show={page === 'add'} newBook={newBook} />
    </div>
  )
}

export default App
