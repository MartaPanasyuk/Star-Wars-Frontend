import React, { useState } from 'react';
import axios from 'axios';
import './css/Movie.css';

export default function Movie() {
  const [title, setTitle] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [filterGender, setFilterGender] = useState(null);
  const [filterHeight, setFilterHeight] = useState(null);
  const [filterAge, setFilterAge] = useState(null);
  const [pageQuery, setPageQuery] = useState(1);

  const getAllMovieCharacters = async () => {
    try {
      let paramOptions = {};
      if (filterGender) {
        paramOptions.gender = filterGender;
      }

      if (filterHeight) {
        paramOptions.height = filterHeight;
      }

      if (filterAge) {
        paramOptions.age = filterAge;
      }

      if (pageQuery) {
        paramOptions.page = pageQuery;
      }

      const response = await axios.get(`http://localhost:4000/movie/${title}`, {
        params: paramOptions,
      });

      const result = response.data;
      setCharacters(result);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    getAllMovieCharacters(title);
  };
  const nextPage = () => {
    setPageQuery(pageQuery + 1);
  };

  const prevPage = () => {
    setPageQuery(pageQuery - 1 > 0 ? pageQuery - 1 : 1);
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div className="selectors-title">
          <div className="select-wrapper">
            <h2>Gender</h2>
            <select onChange={(e) => setFilterGender(e.target.value)}>
              <option disabled selected value>
                {' '}
                -- select an option --{' '}
              </option>
              <option>male</option>
              <option>female</option>
            </select>
          </div>
          <div className="select-wrapper">
            <h2>Height</h2>
            <select onChange={(e) => setFilterHeight(e.target.value)}>
              <option disabled selected value>
                {' '}
                -- select an option --{' '}
              </option>
              <option>ascending</option>
              <option>descending</option>
            </select>
          </div>
          <div className="select-wrapper">
            <h2>Age</h2>
            <select onChange={(e) => setFilterAge(e.target.value)}>
              <option disabled selected value>
                {' '}
                -- select an option --{' '}
              </option>
              <option>ascending</option>
              <option>descending</option>
            </select>
          </div>
          <div className="select-wrapper">
            <h2>Title</h2>
            <select onChange={(e) => setTitle(e.target.value)}>
              <option disabled selected value>
                {' '}
                -- select an option --{' '}
              </option>
              <option>A New Hope</option>
              <option>The Empire Strikes Back</option>
              <option>Return of the Jedi</option>
              <option>The Phantom Menace</option>
              <option>Attack of the Clones</option>
              <option>Revenge of the Sith</option>
            </select>
          </div>
        </div>
        <button type="submit">
          <h2 className="text_btn">show results</h2>
        </button>
        <div className="Btn-wrapper">
          <button onClick={() => nextPage()} className="Btn-wrapper">
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
      <div>
        {!characters ? (
          <h1>To start, select the title and press "show results"</h1>
        ) : (
          <div>
            {characters.map((char) => (
              <div key={char.name}>
                <h2>Name:{char.name}</h2>
                <h3> Gender:{char.gender}</h3>
                <h3>Height: {char.height}</h3>
                <h3>Birth year:{char.birth_year}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/*

 <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="Input-wrapper"
        />

        */
