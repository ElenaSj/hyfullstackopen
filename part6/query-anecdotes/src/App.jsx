import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch} from './NotificationContext'


const App = () => {

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data)
  })
  console.log(JSON.parse(JSON.stringify(result)))

  const votedAnecdoteMutation = useMutation({
    mutationFn: votedAnecdote => axios.put(`http://localhost:3001/anecdotes/${votedAnecdote.id}`, votedAnecdote).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes+1}
    votedAnecdoteMutation.mutate(votedAnecdote)
    notificationDispatch({ type: 'NOTIFY', payload: 'You voted for '+anecdote.content})
    setTimeout(() => {
      notificationDispatch({ type: 'RESET'})
  }, 5000)
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdeote service is not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
