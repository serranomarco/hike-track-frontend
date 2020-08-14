import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import LoginForm from './LoginForm';

const Login = () => {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: 'rgb(153,153,153)', fontWeight: '400' }}>Log In</h1>
                <LoginForm />
                <p>or</p>
                <p>Don't have an account? <NavLink to='/register'>Register Here</NavLink></p>
            </div>
        </>
    )
}

export default Login;
