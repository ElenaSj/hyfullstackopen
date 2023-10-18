import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from 'axios'
import { useNotificationDispatch} from '../NotificationContext'

const AnecdoteForm = () => {

  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: newAnecdote => axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0}, 
      {onError: () => {
        notificationDispatch({ type: 'NOTIFY', payload: 'Anecdote must be at least 5 characters long'})
        },
      onSuccess: () => {
        notificationDispatch({ type: 'NOTIFY', payload: 'You added a new anecdote '+content})
      } 
    }
    )
    setTimeout(() => {
      notificationDispatch({ type: 'RESET'})
  }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
