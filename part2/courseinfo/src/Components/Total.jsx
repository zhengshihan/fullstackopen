import React from "react";

function Total({ course }) {
  const parts = course.parts;
  const count = parts.reduce((sum, part) => sum + part.exercises, 0);

  return <p>total of {count} exercises </p>;
}

export default Total;
