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
        <h2>Climate</h2>
        <select onChange={(e) => setClimateQuery(e.target.value)}>
          <option>arid</option>
          <option>temperate</option>
          <option>tropical</option>
          <option>frozen</option>
          <option>murky</option>
          <option>hot</option>
          <option>rocky</option>
          <option>polluted</option>
        </select>

        <button type="submit">
          <h2 className="button-text">Show info</h2>
        </button>
        <div className="Btn-wrapper">
          <button onClick={() => nextPage()}>
            <h2 className="text_btn">Next page</h2>
          </button>

          <button
            className={pageQuery > 1 ? '' : 'hidden-btn'}
            onClick={() => prevPage()}
          >
            <h2 className="text_btn">Prev page</h2>
          </button>
        </div>
      </form>
      {!climate ? (
        <h2 className="page-message">To start, please choose climate.</h2>
      ) : (
        climate.map((climate, index) => (
          <div key={index} className="residents-wrapper">
            <h1>Plane Name: {climate.name}</h1>
            {climate.dark_haired_residents.length === 0 ? (
              <h2 className="warning-message">
                There is no residents with dark hair on this planet
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

/*

   <input
          type="text"
          value={climateQuery}
          onChange={(e) => setClimateQuery(e.target.value)}
          className="Input-wrapper"
        />

        */
