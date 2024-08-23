import React from "react";
import personService from "../services/persons";
const Person = ({ person, onDeletePerson }) => {
  return (
    <>
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={onDeletePerson(person)}>delete</button>
      </div>
    </>
  );
};

export default Person;
