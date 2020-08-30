import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import HikeTrackContext from '../context/HikeTrackContext';

const FeedNav = () => {
    const { username } = useContext(HikeTrackContext)
    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        window.location.replace('/')
    }
    return (
        <div style={{ padding: '0 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '75px', position: 'fixed', top: '0', left: '0', right: '0', backgroundColor: 'rgb(153, 153, 153)' }}>
            <img alt='background' style={{ height: '100%' }} src='https://hike-track-app.s3-us-west-2.amazonaws.com/logo_size.jpg' />
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
