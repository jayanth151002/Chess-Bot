import './App.css';
import React, { useEffect, useState } from 'react'
import Board from './components/Board';
import axios from 'axios'
const App = () => {
  const [dat, setDat] = useState()

  useEffect(() => {
    axios.get('/data')
      .then(res => setDat(res.data))
      .catch(res => console.log(res))
  }, [])

  return (
    <div className="App">
      <p>
        Chess Bot<br />
        {dat}
        <Board />
      </p>
    </div>
  );
}

export default App;
