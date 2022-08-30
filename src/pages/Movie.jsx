import React, { useState } from 'react';
import axios from 'axios';

export default function Movie() {
  const [title, setTitle] = useState('');
  const [filterGender, setFilterGender] = useState(null);
  const getAllMovieCharacters = async () => {
    try {
      let paramOptions = {};
      if (filterGender) {
        paramOptions.gender = filterGender;
      }
      const response = await axios.get(`http://localhost:4000/movie/${title}`, {
        params: paramOptions,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    getAllMovieCharacters(title);
    setTitle('');
  };
  console.log(filterGender);
  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <select onChange={(e) => setFilterGender(e.target.value)}>
          <option>male</option>
          <option>female</option>
        </select>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Bid</button>
      </form>
    </div>
  );
}
