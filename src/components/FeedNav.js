import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom';
import HikeTrackContext from '../context/HikeTrackContext';

const FeedNav = () => {
    const { username } = useContext(HikeTrackContext)
    return (
        <div style={{ padding: '0 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '75px', position: 'absolute', top: '0', left: '0', right: '0', backgroundColor: 'rgb(153, 153, 153)' }}>
            <img alt='background' style={{ height: '100%' }} src='https://hike-track-app.s3-us-west-2.amazonaws.com/logo_size.jpg' />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <NavLink activeClassName='navbar--active' to='/locations' style={{ marginRight: '20px', textDecoration: 'none', color: 'black' }}>Locations</NavLink>
                <NavLink activeClassName='navbar--active' to={`/${username}/profile`} style={{ textDecoration: 'none', color: 'black' }} >{username}</NavLink>
            </div>
        </div>
    )
}

export default FeedNav;