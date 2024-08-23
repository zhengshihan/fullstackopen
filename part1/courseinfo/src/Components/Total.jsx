import React from "react";

function Total({ course }) {
  const parts = course.parts;
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
}

export default Total;
