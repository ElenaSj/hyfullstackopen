
import { useEffect, useState } from 'react'
import numbers from './services/numbers'
import './App.css'

const Person = ({persons,filter,deletePerson}) => {
  let people = !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  let personrows=people.map(person => <PersonDetail key={person.name} deletePerson={deletePerson} person={person} />)
  return personrows
}

const PersonDetail = ({person, deletePerson}) => {
  return <p>{person.name}, tel. {person.number} <button onClick={()=>deletePerson(person.id)}>Delete</button></p>
}

const FilterField = ({filter,onChange}) => {
  return (
    <div>
        filter shown with <input value={filter} onChange={onChange} />
      </div>
  )
}

const NewPersonForm = ({addName, newName, changeText, changeNumber, newNumber}) => {
  return (
    <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={changeText} />
        </div>
        <div>number: <input value={newNumber} onChange={changeNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Success = ({message}) => {
  if (message===null) return null

  return (
    <div className="success">
      {message}
    </div>
  )
}

const Error = ({message}) => {
  if (message===null) return null

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{
    numbers.getAll()
      .then(response => setPersons(response.data))
  },[])

  const changeText = (event) => setNewName(event.target.value)
  const changeNumber = (event) => setNewNumber(event.target.value)

  const addName = (event) =>{
    event.preventDefault()
    const newPerson={name:newName, number:newNumber}
    const person = persons.find(p => p.name.toLowerCase()===newName.toLowerCase())
    if (person) {
      if (window.confirm(`${person.name} already exists in phonebook, replace the old number?`)){
        numbers.update(person.id,{...person,number:newNumber})
        .then(response => {
          setPersons(persons.map(p => p.id!==response.data.id ? p : response.data))
          setSuccessMessage(`Phone number for ${response.data.name} was changed`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }).catch(error => {
          setErrorMessage(`Failed to update ${person.name}: ${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        setNewName("")
        setNewNumber("")
      }
    } else {
    numbers.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setSuccessMessage(`${response.data.name} added to phonebook`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName("")
          setNewNumber("")
        }).catch(error => {
          setErrorMessage(`Adding a new phonebook entry failed: ${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
     
      }
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id===id)
    if (window.confirm(`Delete ${person.name}?`)) {
      numbers.remove(id)
      .then(()=>setPersons(persons.filter(p => p.id!==id)))
    } 
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Success message={successMessage} />
      <Error message={errorMessage} />
      <FilterField filter={filter} onChange={ev=>setFilter(ev.target.value)}/>
      <h3>Add a new number</h3>
      <NewPersonForm addName={addName} changeText={changeText} newNumber={newNumber} changeNumber={changeNumber} newName={newName} />
      <h2>Numbers</h2>
      <Person persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App