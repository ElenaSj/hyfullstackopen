import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const votedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote)
    },
    getAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, vote, getAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(getAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteFor = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteFor(anecdote)
    dispatch(vote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer