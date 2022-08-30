import React, { useState } from 'react';
import axios from 'axios';
import './css/Planets.css';

export default function Planets() {
  const [climateQuery, setClimateQuery] = useState('');
  const [pageQuery, setPageQuery] = useState(1);
  const [climate, setClimate] = useState(null);
  const getAllPlanets = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/planets/?climate=${climateQuery}&page=${pageQuery}`
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

  const nextPage = () => {
    setPageQuery(pageQuery + 1);
    console.log(pageQuery);
  };
  const prevPage = (n) => {
    setPageQuery(pageQuery - n);
  };

  console.log(climateQuery, 'my climate');

  return (
    <div className="Planet-wrapper">
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          value={climateQuery}
          onChange={(e) => setClimateQuery(e.target.value)}
          className="Input-wrapper"
        />
        <button type="submit" className="btn-container">
          <h2 className="button-text">Submit</h2>
        </button>
      </form>
      {!climate ? (
        <h2 className="page-message">To start, please enter climate.</h2>
      ) : (
        climate.map((climate, index) => (
          <div key={index} className="residents-wrapper">
            <h1>Plane Name: {climate.name}</h1>
            {climate.dark_haired_residents.length === 0 ? (
              <h2 className="warning-message">
                There is no residents with dark hair
              </h2>
            ) : (
              climate.dark_haired_residents.map((c) => (
                <div key={c.name}>
                  <h3>Name: {c.name}</h3>
                  <h3>Hair color: {c.hair_color}</h3>
                </div>
              ))
            )}
          </div>
        ))
      )}
      <div className="btn-wrapper">
        <button onClick={() => nextPage()}>Next Page</button>
        <button onClick={() => prevPage(1)}>Prev Page</button>
      </div>
    </div>
  );
}
