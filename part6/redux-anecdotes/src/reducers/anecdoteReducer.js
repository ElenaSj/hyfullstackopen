import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes+1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : votedAnecdote)
    },
    getAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteFor, getAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer