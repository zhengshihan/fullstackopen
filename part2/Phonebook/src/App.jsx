import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import Persons from "./components/Persons";
import axios from "axios";
import personService from "./services/persons";
import Notification from "./components/Notification";
import Error from "./components/Error";
const App = () => {
  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtedPerson, setFiltedPerson] = useState("");
  const onFiltedPersonChange = (e) => setFiltedPerson(e.target.value);
  const onAddClick = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name == newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personObject = {
          name: newName,
          number: newNumber,
        };
        const person = persons.find((person) => person.name === newName);
        personService
          .update(person.id, personObject)
          .then((response) => {
            setNewNumber("");
            setNewName("");
            setMessage(`Added ${person.name} `);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          })
          .catch((error) => {
            setError(error.response.data.error);
            console.log(error.response.data.error);
            setTimeout(() => {
              setError(null);
            }, 3000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewNumber("");
          setNewName("");
          setMessage(`Added ${response.data.name} `);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setError(error.response.data.error);
          console.log(error.response.data.error);
          setTimeout(() => {
            setError(null);
          }, 3000);
        });
    }
  };
  const onNameChange = (e) => setNewName(e.target.value);
  const onNumberChange = (e) => setNewNumber(e.target.value);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onDeletePerson = (person) => () => {
    if (window.confirm(`Delete the ${person.name}?`)) {
      personService.deletePerson(person.id).then(() => {
        personService.getAll().then((response) => {
          setPersons(response.data);
        });
      });
    } else {
      // 用户点击了“取消”
      console.log("Deletion canceled");
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFiltedPersonChange={onFiltedPersonChange} />
      <h3>Add a new</h3>
      <PersonForm
        onDeletePerson={onDeletePerson}
        onNameChange={onNameChange}
        onNumberChange={onNumberChange}
        onAddClick={onAddClick}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {message ? <Notification message={message} /> : null}
      {error ? <Error message={error} /> : null}

      <Persons
        filtedPerson={filtedPerson}
        persons={persons}
        onDeletePerson={onDeletePerson}
      />
    </div>
  );
};

export default App;
