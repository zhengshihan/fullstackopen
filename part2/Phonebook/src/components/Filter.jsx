import React from "react";
import { useState } from "react";

const Filter = ({ onFiltedPersonChange }) => {
  const [filtedPerson, setFiltedPerson] = useState("");

  return (
    <>
      <div>
        filter shown with
        <input onChange={onFiltedPersonChange} />
      </div>
    </>
  );
};

export default Filter;
