import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const DetailS = ({ country }) => {
  const api_key = import.meta.env.VITE_SOME_KEY;
  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data);
      });
  }, []);

  console.log(weatherData);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <h5>capital {country.capital}</h5>
      <h5>area {country.area}</h5>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Description of image" />
      <h2>Weather in {country.name.common}</h2>
      {weatherData ? (
        <div>
          {" "}
          <h3>temperature {weatherData.main.temp} Celcius</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt=""
          />
          <h3>temperature {weatherData.wind.speed} m/s</h3>
        </div>
      ) : null}
    </div>
  );
};

export default DetailS;
