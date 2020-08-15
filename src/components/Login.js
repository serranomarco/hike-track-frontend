import React, { useContext, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core'

import HikeTrackContext from '../context/HikeTrackContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const { register, handleSubmit, errors } = useForm();
    const [loggedIn, setLoggedIn] = useState(false);
    const { username, login, needLogin } = useContext(HikeTrackContext);

    const onSubmit = async (data) => {
        console.log('This is what is sent: ')
        console.log(data)
        try {
            const res = await fetch(`${apiUrl}/users/login`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                const data = await res.json();
                if (data.error) {
                    setLoginError(data.error)
                }
                if (data.token) {
                    login(data.token, data.username);
                    setLoggedIn(true)
                }
                console.log('This is what I received: ')
                console.log(data)
            }
        } catch (err) {
            console.error(err)
        }
    }
    console.log(needLogin)
    return (
        <>
            {!needLogin ? <Redirect to={`/${username}/feed`} /> :
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ color: 'rgb(153,153,153)', fontWeight: '400' }}>Log In</h1>
                    <form style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', width: '400px' }} onSubmit={handleSubmit(onSubmit)}>
                        <TextField inputRef={register()} style={{ marginBottom: '10px' }} name='email' label='Email' type='text' />
                        <TextField inputRef={register()} style={{ marginBottom: '10px' }} name='password' label='Password' type='password' />
                        <Button type='submit' style={{ fontWeight: '400', color: 'white', marginTop: '10px', backgroundColor: 'rgb(153,153,153)' }}>Log In</Button>
                    </form>
                    <p>or</p>
                    <p>Don't have an account? <NavLink to='/register'>Register Here</NavLink></p>
                </div>}

        </>
    )
}

export default Login;
