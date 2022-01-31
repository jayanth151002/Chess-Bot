import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
const App = () => {
  const [dat, setDat] = useState()

  useEffect(() => {
    axios.get('http://localhost:8000/data')
      .then(res => setDat(res.data))
      .catch(res => console.log(res))
  }, [])

  return (
    <div className="App">
      <p>
        Chess Bot<br/>
        {dat}
      </p>
    </div>
  );
}

export default App;
