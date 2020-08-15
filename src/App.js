import React, { useState } from 'react';
import HikeTrackContext from './context/HikeTrackContext';
import Routes from './components/Routes'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [username, setUsername] = useState(localStorage.getItem('username') || '')
  const [needLogin, setNeedLogin] = useState(!localStorage.getItem('token'));

  const login = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setToken(localStorage.getItem('token'));
    setUsername(localStorage.getItem('username'));
    setNeedLogin(false);
  }

  const context = {
    token,
    setToken,
    username,
    setUsername,
    needLogin,
    setNeedLogin,
    login
  };
  return (
    <HikeTrackContext.Provider value={context} >
      <Routes />
    </HikeTrackContext.Provider>
  );
}

export default App;
