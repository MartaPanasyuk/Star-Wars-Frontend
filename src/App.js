import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';

import Movie from './pages/Movie';
import Planets from './pages/Planets';

function App() {
  return (
    <div className="App">
      <div className="Navigation">
        <NavLink className="NavElement" end to="/">
          Movie
        </NavLink>
        <NavLink className="NavElement" end to="/planets/">
          Planets
        </NavLink>
      </div>
      <Routes>
        <Route exact path="/" element={<Movie />} />
        <Route exact path="/planets/" element={<Planets />} />
      </Routes>
    </div>
  );
}

export default App;
