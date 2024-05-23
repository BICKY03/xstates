import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");

  useEffect(() => {
    fetch("https://crio-location-selector.onrender.com/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("error in countries API", err));
  }, []);

  useEffect(() => {
    if (country) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      )
        .then((res) => res.json())
        .then((data) => {
          setStates(data);
          setCity("");
          setCities([]);
          setCity("");
        })
        .catch((err) => console.error("error in states API", err));
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      fetch(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      )
        .then((res) => res.json())
        .then((data) => {
          setCities(data);
          city("");
        })
        .catch((err) => console.error("error in cities API", err));
    }
  }, [country, state, city]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div className="dropdowns">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="dropdown"
        >
          <option disabled value="">
            Select Country
          </option>
          {countries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="dropdown"
        >
          <option disabled value="">
            Select State
          </option>
          {states.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="dropdown"
        >
          <option disabled value="">
            Select City
          </option>
          {cities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {city && (
        <h2 className="result">
          You selected <span className="highlight">{city},</span>
          <span className="fade">
            {" "}
            {state}, {country}
          </span>
        </h2>
      )}
    </div>
  );
}

export default App;

