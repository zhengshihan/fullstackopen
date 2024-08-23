import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";
import axios from "axios";
import Detail from "./Components/Details";
import MulDetails from "./Components/MulDetails";

function App() {
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  // const[matchedCountries,setMatchedCountries] = useState([]);
  const [displayedCountry, setDisplayedCountry] = useState([]);
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  useEffect(() => {
    const lowerCaseSearchTerm = country.toLowerCase();
    const matchedCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(lowerCaseSearchTerm)
    );

    // Check the number of matches
    if (matchedCountries.length > 10) {
      setDisplayedCountry([]);
      setMessage("Too many matches,specify another filter");
      // Display a shortened list with an ellipsis or handle it accordingly
    } else {
      setMessage("");
      setDisplayedCountry(matchedCountries);
    }
  }, [country]);
  const onSearchChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <>
      <div>
        <label htmlFor="">find countries</label>
        <input onChange={onSearchChange} type="text" />
      </div>
      <div>{message}</div>
      <div>
        {displayedCountry.length > 1
          ? displayedCountry.map((country) => {
              return <MulDetails country={country} />;
            })
          : displayedCountry.map((country) => {
              return <Detail country={country} />;
            })}
      </div>
    </>
  );
}

export default App;
