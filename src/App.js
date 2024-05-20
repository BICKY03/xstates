import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        // Fetch countries on initial render
        fetch('https://crio-location-selector.onrender.com/countries')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            // Fetch states when a country is selected
            fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
                .then(response => response.json())
                .then(data => setStates(data))
                .catch(error => console.error('Error fetching states:', error));
        } else {
            setStates([]);
            setCities([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            // Fetch cities when a state is selected
            fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
                .then(response => response.json())
                .then(data => setCities(data))
                .catch(error => console.error('Error fetching cities:', error));
        } else {
            setCities([]);
        }
    }, [selectedCountry, selectedState]);

    return (
        <div>
            <h1>Select Location</h1>
            <select 
                value={selectedCountry} 
                onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setSelectedState('');
                    setSelectedCity('');
                }}>
                <option value="">Select Country</option>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>

            <select 
                value={selectedState} 
                onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity('');
                }} 
                disabled={!selectedCountry}>
                <option value="">Select State</option>
                {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                ))}
            </select>

            <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)} 
                disabled={!selectedState}>
                <option value="">Select City</option>
                {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>

            {selectedCity && (
                <div id="result">
                    You Selected {selectedCity}, {selectedState}, {selectedCountry}
                </div>
            )}
        </div>
    );
};

export default LocationSelector;

