import {  useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '') {
        return anecdotes
    } else {
        return anecdotes.filter(a => a.content.includes(filter))
    }
  })
    
  const vote = (id, content) => {
    dispatch(voteFor(id))
    dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => {
        dispatch(removeNotification())
    }, 5000)
  }

  const anecdotesToSort = [...anecdotes]
    
  const sortedAnecdotes = anecdotesToSort.sort((a, b) => a.votes-b.votes).toReversed()
  
  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
        </div>
      )}
    </div>          
  )
}
  
export default AnecdoteList