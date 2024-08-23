import React from "react";
import Part from "./Part";

function Content({ course }) {
  const parts = course.parts;

  return (
    <>
      {parts.map((part) => {
        return (
          <Part name={part.name} exercises={part.exercises} id={part.id} />
        );
      })}
    </>
  );
}

export default Content;
