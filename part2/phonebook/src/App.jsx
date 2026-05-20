import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '1234' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState({ notificationStatus: "success", notificationMessage: "Sample" })

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons))
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {
      if (confirm(`${newName} is already added to the phonebook, would you like to replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        personService.updateNumber(updatedPerson.id, updatedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          setNotification({notificationStatus: "success", notificationMessage: `Updated ${updatedPerson.name}'s number.`})
          setTimeout(() => {
            setNotification({ ...notification, notificationMessage: null})
          }, 5000)
        }).catch(error => {
          setNotification({notificationStatus: "error", notificationMessage: `Information of ${updatedPerson.name} has already been removed from the server.`})
          setPersons(persons.filter(person => person.id !== updatedPerson.id))
          setTimeout(() => {
            setNotification({ ...notification, notificationMessage: null})
          }, 5000)
        })
      }
      return
    }

    if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to the phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotification({ notificationStatus: "success", notificationMessage: `Added ${returnedPerson.name}.`})
      setTimeout(() => {
        setNotification({ ...notification, notificationMessage: null})
      }, 5000)
    })
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleDelete = (id, name) => {
    if (confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then(() => setPersons(persons.filter(person => person.id !== id))).catch(error => console.log("Error deleting:", error))
    }
  }

  const namesToShow = nameFilter === '' 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().split(' ').some(word => word.startsWith(nameFilter.toLowerCase())))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter nameFilter={nameFilter} handleNameFilterChange={handleNameFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App