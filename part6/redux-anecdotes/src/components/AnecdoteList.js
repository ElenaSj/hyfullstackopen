import {  useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '') {
        return anecdotes
    } else {
        return anecdotes.filter(a => a.content.includes(filter))
    }
  })
    
  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
  }
    
  let sortedAnecdotes = anecdotes.sort((a, b) => a.votes-b.votes).toReversed()
  
  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
        </div>
      )}
    </div>          
  )
}
  
export default AnecdoteList