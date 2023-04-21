const Header = (props) => <h1>{props.name}</h1>

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Content = (props) => {
    let parts = props.parts.map(part => <Part key={part.id} part={part} />)
    return (
      <>
      { parts }
      </>
    )
}

const Total = (props) => {
    const sum = props.parts.reduce((s,p)=>s+p.exercises,0)
    return (
      <>
      <p style={{fontWeight:"bolder"}}>Total of {sum} exercises</p>
      </>
    )
}

const CourseDetail = (props) => {
    return (
        <>
        <Header name={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
        </>
    )
}

const Course = (props) => {

let courses = props.courses.map(course => <CourseDetail course={course} key={course.id} />)

    return (
        <div>
            {courses}
        </div>
    )

}

export default Course