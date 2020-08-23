import React, { useState } from 'react';
import HikeTrackContext from './context/HikeTrackContext';
import Routes from './components/Routes'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [username, setUsername] = useState(localStorage.getItem('username') || '')
  const [id, setId] = useState(localStorage.getItem('id') || '');
  const [needLogin, setNeedLogin] = useState(!localStorage.getItem('token'));
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({})

  const login = (token, username, id) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    localStorage.setItem('id', id)
    setToken(localStorage.getItem('token'));
    setUsername(localStorage.getItem('username'));
    setId(localStorage.getItem('id'))
    setNeedLogin(false);
  }

  const context = {
    token,
    setToken,
    username,
    setUsername,
    id,
    setId,
    needLogin,
    setNeedLogin,
    login,
    posts,
    setPosts,
    currentPost,
    setCurrentPost
  };
  return (
    <HikeTrackContext.Provider value={context} >
      <Routes />
    </HikeTrackContext.Provider>
  );
}

export default App;
