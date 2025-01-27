import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PersonService from './services/persons'
import HandleList from './components/HandleList'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('A new person')
  const [newNumber, setNewNumber] = useState('A new number')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(alustaPersons => {
        setPersons(alustaPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
      const personObject = {
      name: newName,
      number: newNumber
      }
      // console.log(personObject.name)
    if (personExists(personObject.name)) {
      const foundPerson=personExists(personObject.name)
      if(window.confirm(`${foundPerson.name} is already added to the phonebook, would you like to update their phone number. 
        this is their number ${foundPerson.name} 
        and this is their id ${foundPerson.id}`))
        PersonService
        .update(foundPerson.id, personObject)
        .then(vastaus => {
          //console.log(vastaus, 'vastauksen testaus', vastaus.id, '=tämä on vastauksen id')
          setPersons(persons.map(person => vastaus.id !== person.id ? person:vastaus))  
          setTimeout(() => {
            Notification(`${foundPerson.name} number updated succesfully`)
          }, 1000);    
        })
      setNewName('')
      setNewNumber('')
      return
    }
    if (!personExists(personObject.name)){
      const uusi_id = (persons.length + 1).toString();
      PersonService
      .create({...personObject, id:uusi_id})
      .then((person) => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      PersonService
      .deletePerson(person.id)
      .then((reply)=>{
        console.log(reply, 'deleted succesfully')
        const idpaivitys=persons
        .filter((p) => p.id !== person.id)
        .map((p, index) => ({
          ...p,
          id: (index + 1).toString()
        }))
      setPersons(idpaivitys)
      })
      .catch((error) => {
        console.error(error, 'errorin tulostus')
      })
    } else {
      console.log("false")
    }
  }
  
  const personExists = (newName) => {
    return persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
    person.name?.toLowerCase().includes(searchName.toLowerCase())
  )

  const NotificationMessages = ({message}) => {
    if(message===null){
      return null
    }
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <input type='text' placeholder='search name' value={searchName} onChange={handleSearchChange} />
      <PersonForm
        onSubmit={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}/>
      <h3>Persons</h3>
      <HandleList persons={filteredPersons} deletePerson={deletePerson}/>
      <NotificationMessages message={errorMessage}/>
    </div>
  )
}

export default App