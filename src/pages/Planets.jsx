import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Planets() {
  const [amount, setAmount] = useState('');
  const getAllMovieCharacters = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/movie/${amount}`,
        { params: { gender: 'male' } }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    getAllMovieCharacters(amount);
    setAmount('');
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Bid</button>
      </form>
      ;
    </div>
  );
}
