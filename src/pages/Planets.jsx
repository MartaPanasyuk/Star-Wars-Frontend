import React, { useState } from 'react';
import axios from 'axios';

export default function Planets() {
  const [climateQuery, setClimateQuery] = useState('');
  const [climate, setClimate] = useState(null);
  const getAllPlanets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/planets/?climate=${climateQuery}`
      );
      const result = response.data;
      setClimate(result);
    } catch (e) {
      console.log(e);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    getAllPlanets(climateQuery);
    setClimateQuery('');
  };

  console.log(climateQuery, 'my climate');

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          value={climateQuery}
          onChange={(e) => setClimateQuery(e.target.value)}
        />
        <button type="submit">Get</button>
      </form>
      {!climate ? (
        <h2>Please enter climate</h2>
      ) : (
        climate.map((climate, index) => (
          <div key={index}>
            <h2>{climate.name}</h2>
            {climate.dark_haired_residents.map((c) => (
              <div key={c.name}>
                <h2>{c.name}</h2>
                <p>{c.height}</p>
                <p>{c.hair_color}</p>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
