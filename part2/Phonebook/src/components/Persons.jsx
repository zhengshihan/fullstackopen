import React from "react";
import Person from "./Person";

const Persons = ({ persons, filtedPerson, onDeletePerson }) => {
  return (
    <>
      {filtedPerson
        ? persons
            .filter(
              (person) =>
                person.name.toLowerCase() == filtedPerson.toLowerCase()
            )
            .map((person) => (
              <Person
                key={person.name}
                person={person}
                onDeletePerson={onDeletePerson}
              />
            ))
        : persons.map((person) => (
            <Person
              key={person.name}
              person={person}
              onDeletePerson={onDeletePerson}
            />
          ))}
    </>
  );
};

export default Persons;
