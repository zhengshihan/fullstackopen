import React, { useState } from "react";
import Details from "./Details";

const MulDetails = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <h4>
        <label htmlFor="">{country.name.common}</label>{" "}
        <button onClick={() => setShow(true)}>show</button>
      </h4>
      {show && <Details country={country} />}
    </>
  );
};

export default MulDetails;
