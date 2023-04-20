import { useState } from "react";

const StatisticLine = (props) => {
  if (props.suffix) return (
    <tr><td>{props.text}</td><td>{props.value}{props.suffix}</td></tr>
  )

  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const Statistics = (props) => {
  let all = props.good + props.bad + props.neutral 
  let average = (props.good*1 + props.bad*-1)/all 
  let positive = props.good/all*100 

  if (all===0) return (
    <>
      <p>No feedback given</p>
    </>
  )

  return (
    <div>
      <h1>statistics</h1>
      <table>
      <tbody>
      <StatisticLine text={"good"} value={props.good} />
      <StatisticLine text={"neutral"} value={props.neutral} />
      <StatisticLine text={"bad"} value={props.bad} />
      <StatisticLine text={"all"} value={all} />
      <StatisticLine text={"average"} value={average} />
      <StatisticLine text={"positive"} value={positive} suffix={" %"} />
      </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  return (
    <>
    <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text="good" />
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={()=>setBad(bad+1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>

  )
}

export default App;
