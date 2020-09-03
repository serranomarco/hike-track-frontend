import React, { useContext, useState } from 'react'
import { NavLink, Redirect, Route } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Input, Button, Menu, MenuItem } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

import Profile from './Profile';
import HikeTrackContext from '../context/HikeTrackContext';

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const FeedNav = () => {
    const [search, setSearch] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const { username, token } = useContext(HikeTrackContext);
    const { handleSubmit, register } = useForm()

    const handleClick = (event) => {
        const input = document.getElementById('search')
        setAnchorEl(input);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const searchUsers = async (data, e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${apiUrl}/users/search`, {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                const data = await res.json();
                console.log(data)
                setSearch(data)
            }
        } catch (err) {
            console.error(err)
        }
    }
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        window.location.replace('/');
    }
    return (
        <div style={{ padding: '0 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '75px', position: 'fixed', top: '0', left: '0', right: '0', backgroundColor: 'rgb(153, 153, 153)' }}>
            <img alt='background' style={{ height: '100%' }} src='https://hike-track-app.s3-us-west-2.amazonaws.com/logo_size.jpg' />
            <form style={{ display: 'flex', alignItems: 'center' }} onSubmit={handleSubmit(searchUsers)}>
                <SearchIcon />
                <Input id='search' style={{ position: 'relative' }} name='search' inputRef={register()} type='text' placeholder='Search for other hikers' style={{ marginLeft: '10px', backgroundColor: 'white', borderRadius: '2.5px', width: '400px' }} />
                <Button onClick={handleClick} style={{ marginLeft: '10px', fontWeight: '400', fontSize: '10px', color: 'white', backgroundColor: 'rgb(213,152,107)', padding: '7px' }} type='submit'>Search</Button>
            </form>
            <Menu
                style={{ marginTop: '35px' }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {search.map((user) => {
                    return (
                        <MenuItem onClick={() => {
                            return window.location.replace(`/${user.username}/profile`)
                        }} key={user.id} style={{ width: '400px' }}>
                            <img alt='profile' style={{ borderRadius: '50%', width: '30px', height: '30px', marginRight: '20px' }} src={user.profile_pic_url} />
                            <p style={{ margin: '0px' }}>@{user.username}</p>
                            <Route path={`${user.username}/profile`} render={(props) => (
                                <Profile {...props} user={user} />
                            )} />
                        </MenuItem>
                    )
                })}
            </Menu>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <NavLink activeClassName='navbar--active' to={`/${username}/feed`} style={{ marginRight: '20px', textDecoration: 'none', color: 'black' }}>Home</NavLink>
                <NavLink activeClassName='navbar--active' to='/locations' style={{ marginRight: '20px', textDecoration: 'none', color: 'black' }}>Locations</NavLink>
                <NavLink activeClassName='navbar--active' to={`/${username}/profile`} style={{ marginRight: '20px', textDecoration: 'none', color: 'black' }} >{username}</NavLink>
                <a href='/' onClick={logout} style={{ textDecoration: 'none', color: 'black' }}>Logout</a>
            </div>
        </div>
    )
}

export default FeedNav;
