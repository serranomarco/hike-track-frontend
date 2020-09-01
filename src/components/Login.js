import React, { useContext, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@material-ui/core'

import HikeTrackContext from '../context/HikeTrackContext'
import BottomNav from './BottomNav';

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const { register, handleSubmit, errors } = useForm();
    const { username, login, needLogin } = useContext(HikeTrackContext);

    const onSubmit = async (data, e) => {
        e.preventDefault();
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
                    login(data.token, data.username, data.id);
                }
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            {!needLogin ? <Redirect to={`/${username}/feed`} /> :
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ color: 'rgb(153,153,153)', fontWeight: '400' }}>Log In</h1>
                    <form style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', width: '400px' }} onSubmit={handleSubmit(onSubmit)}>
                        {loginError && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Login failed, please try again</Typography>}
                        <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='email' label='Email' type='text' />
                        {errors.email && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px' }}>Please enter an email</Typography>}
                        <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='password' label='Password' type='password' />
                        {errors.password && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px' }} > Please enter a password</Typography>}
                        <Button type='submit' style={{ fontWeight: '400', color: 'white', marginTop: '10px', backgroundColor: 'rgb(213,152,107)' }}>Log In</Button>
                    </form>
                    <p>or</p>
                    <p>Don't have an account? <NavLink to='/register'>Register Here</NavLink></p>
                    <BottomNav />
                </div>}

        </>
    )
}

export default Login;
