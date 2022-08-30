import { Route, Routes } from 'react-router-dom';
import './App.css';

import Movie from './pages/Movie';
import Planets from './pages/Planets';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Movie />} />
        <Route exact path="/planets/" element={<Planets />} />
      </Routes>
    </div>
  );
}

export default App;

/*



*/
