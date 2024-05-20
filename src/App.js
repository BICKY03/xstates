import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [country, setCountry] = useState([]);
  const [countryName, setCountryName] = useState('');
  const [state, setState] = useState([]);
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState([]);
  const [cityName, setCityName] = useState('');

  const fetchCountry = async () => {
    try {
      const response = await fetch("https://crio-location-selector.onrender.com/countries");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCountry(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchState = async (countryName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setState(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCity = async (stateName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCity(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    if (countryName) {
      fetchState(countryName);
    }
  }, [countryName]);

  useEffect(() => {
    if (stateName) {
      fetchCity(stateName);
    }
  }, [stateName]);

  const changeCountryHandler = (event) => {
    setCountryName(event.target.value);
    setStateName(''); // reset state and city when country changes
    setCityName('');
    setState([]);
    setCity([]);
  };

  const changeStateHandler = (event) => {
    setStateName(event.target.value);
    setCityName(''); // reset city when state changes
    setCity([]);
  };

  const changeCityHandler = (event) => {
    setCityName(event.target.value);
  };

  return (
    <div className="App">
      <label htmlFor="countries">Select A country</label>
      <select id="countries" name="countries" onChange={changeCountryHandler} value={countryName}>
        <option value="">--select a country---</option>
        {country.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div>
        <label htmlFor="states">Select A state</label>
        <select id="states" name="states" onChange={changeStateHandler} value={stateName} disabled={!countryName}>
          <option value="">--select a state---</option>
          {state.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cities">Select A city</label>
        <select id="cities" name="cities" onChange={changeCityHandler} value={cityName} disabled={!stateName}>
          <option value="">--select a city---</option>
          {city.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="selected-location">
        <h2>You Selected:{countryName},{stateName}, {cityName}</h2>
      
      </div>
    </div>
  );
}

export default App;

