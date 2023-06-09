const Header = (props) => {
  return (
    <>
    <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
  <>
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  </>
  )
}

const Content = (props) => {
  let parts = props.parts.map(part => <Part part={part} />)
  return (
    <>
    { parts }
    </>
  )
}

const Total = (props) => {
  let sum = 0;
  props.parts.forEach(part => sum+=part.exercises)
  return (
    <>
    <p>Number of exercises {sum}</p>
    </>
  )
}



const App = () => {
  const course = {
    name: "Half Stack application developmet",
    parts: [
    {
      name: "Fundamentals of React",
      exercises: 10
    },
    {
      name: "Using props to pass data",
      exercises: 7
    },
    { 
      name: "Sate of a component",
      exercises: 14
    }
  ]
}

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App;
