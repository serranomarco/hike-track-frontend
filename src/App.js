import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HikeTrackContext from './context/HikeTrackContext';
import Routes from './components/Routes'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const context = {
    token,
    setToken
  };
  return (
    <HikeTrackContext.Provider value={context} >
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </HikeTrackContext.Provider>
  );
}

export default App;
