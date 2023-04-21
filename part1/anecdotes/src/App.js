import { useState } from 'react';


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    "Even the best planning is not so omniscient as to get it right the first time.",
    "The bearing of a child takes nine months, no matter how many women are assigned. Many software tasks have this characteristic because of the sequential nature of debugging.",
    "Program testing can be used to show the presence of bugs, but never to show their absence!",
    "Why do we never have time to do it right, but always have time to do it over?",
    "The use of COBOL cripples the mind; its teaching should, therefore, be regarded as a criminal offense.",
    "If Java had true garbage collection, most programs would delete themselves upon execution.",
    "Wirth's law: Software gets slower faster than hardware gets faster."
  ]

  const [points, setPoints]=useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
  const [selected, setSelected]=useState(0)
  const [bestVoted, setBestVoted]=useState(0)

  const nextAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const voteAnecdote = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    setPoints(copyPoints)
    if (copyPoints[selected]>copyPoints[bestVoted]) setBestVoted(selected)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={voteAnecdote}>Vote</button><button onClick={nextAnecdote}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[bestVoted]}</p>
      <p>has {points[bestVoted]} votes</p>
    </div>

  )

} 

export default App;
