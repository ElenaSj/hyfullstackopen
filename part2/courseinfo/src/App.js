import Course from "./components/Course"

/*

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


*/
const App = () => {
  const courses = [{
    id: 1,
    name: "Half Stack application developmet",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2
      },
      { 
        name: "Sate of a component",
        exercises: 14,
        id: 3
      },
      { 
        name: "Redux",
        exercises: 11,
        id: 4
      }
    ]
  }, 
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

  return <Course courses={courses} />
}

export default App;
