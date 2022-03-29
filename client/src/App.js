import './App.css';
import React, { useEffect, useState } from 'react'
import Home from './components/Home';
import MultiBoard from './components/MultiBoard';
import SingleBoard from './components/Singleboard';
import { Routes, Route, Redirect } from 'react-router-dom'
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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/multiplayer' element={<MultiBoard />} />
        <Route path='/singleplayer' element={<SingleBoard />} />
      </Routes>
    </div>
  );
}

export default App;
