import React from 'react';
import { NavLink } from 'react-router-dom';

const TopNav = () => {
    return (
        <div style={{ padding: '0 25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '75px', position: 'absolute', top: '0', left: '0', right: '0', backgroundColor: 'rgba(153, 153, 153, 0.8)' }}>
            <img style={{ height: '100%' }} src='https://hike-track-app.s3-us-west-2.amazonaws.com/logo_size.jpg' />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <NavLink activeClassName='navbar--active' to='/register' style={{ marginRight: '20px', textDecoration: 'none', color: 'black' }}>Register</NavLink>
                <NavLink activeClassName='navbar--active' to='/login' style={{ textDecoration: 'none', color: 'black' }} >Login</NavLink>
            </div>
        </div>
    );
}
export default TopNav;
