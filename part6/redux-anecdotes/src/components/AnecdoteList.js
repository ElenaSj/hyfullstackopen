import {  useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '') {
        return anecdotes
    } else {
        return anecdotes.filter(a => a.content.includes(filter))
    }
  })
    
  const vote = (anecdote) => {
    dispatch(voteFor(anecdote))
    dispatch(notify(`You voted '${anecdote.content}'`, 5))
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
      )}
    </div>          
  )
}
  
export default AnecdoteList