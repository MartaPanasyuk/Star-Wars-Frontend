import React, { useState } from 'react';
import axios from 'axios';
import './css/Planets.css';

export default function Planets() {
  const [climateQuery, setClimateQuery] = useState('');
  const [climate, setClimate] = useState(null);
  const [pageQuery, setPageQuery] = useState(1);
  const getAllPlanets = async () => {
    try {
      let paramOptions = {};
      if (pageQuery) {
        paramOptions.page = pageQuery;
      }
      const response = await axios.get(
        `http://localhost:4000/planets/?climate=${climateQuery}`,
        {
          params: paramOptions,
        }
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
  };

  const prevPage = () => {
    setPageQuery(pageQuery - 1 > 0 ? pageQuery - 1 : 1);
  };

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
        <div className="Btn-wrapper">
          <button onClick={() => nextPage()}>Next</button>
          {pageQuery > 1 ? (
            <button onClick={() => prevPage()}>Prev</button>
          ) : (
            <></>
          )}
        </div>
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
    </div>
  );
}
