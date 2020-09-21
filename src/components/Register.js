import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, NavLink } from 'react-router-dom';
import { TextField, Button, Typography } from '@material-ui/core'

import HikeTrackContext from '../context/HikeTrackContext';
import BottomNav from './BottomNav'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false)

    const { register, handleSubmit, errors, watch } = useForm();
    const { username, login, needLogin } = useContext(HikeTrackContext);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiUrl}/users/register`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                const data = await res.json();
                if (data.error) {
                    setRegisterError(data.error)
                }
                if (data.token) {
                    setLoggedIn(true)
                    login(data.token, data.username, data.id)
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>{!needLogin ? <Redirect to={`/${username}/feed`} /> :
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: 'rgb(153,153,153)', fontWeight: '400' }}>Create an Account</h1>
                <form style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', width: '400px' }} onSubmit={handleSubmit(onSubmit)}>
                    {registerError && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>User already exists</Typography>}
                    <TextField inputRef={register({ required: true, maxLength: 50 })} style={{ marginBottom: '10px' }} name='username' label='Username' type='text' />
                    {errors.username?.type === 'required' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Username is required</Typography>}
                    {errors.username?.type === 'maxLength' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Username must be below 50 characters</Typography>}
                    <TextField inputRef={register({ required: true, maxLength: 25 })} style={{ marginBottom: '10px' }} name='firstName' label='First Name' type='text' />
                    {errors.firstName?.type === 'required' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>First name is required</Typography>}
                    {errors.firstName?.type === 'maxLength' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>First name must be below 25 characters</Typography>}
                    <TextField inputRef={register({ required: true, maxLength: 25 })} style={{ marginBottom: '10px' }} name='lastName' label='Last Name' type='text' />
                    {errors.lastName?.type === 'required' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Last name is required</Typography>}
                    {errors.lastName?.type === 'maxLength' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Last name must be below 25 characters</Typography>}
                    <TextField inputRef={register({ required: true, maxLength: 50, pattern: /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/ })} style={{ marginBottom: '10px' }} name='email' label='Email' type='text' />
                    {errors.email?.type === 'required' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Email is required</Typography>}
                    {errors.email?.type === 'maxLength' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Email must be below 50 characters</Typography>}
                    {errors.email?.type === 'pattern' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Please enter a valid email address</Typography>}
                    <TextField inputRef={register({ required: true, minLength: 6, maxLength: 50 })} style={{ marginBottom: '10px' }} name='password' label='Password' type='password' />
                    {errors.password?.type === 'required' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Password is required</Typography>}
                    {errors.password?.type === 'minLength' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Password must be between 6 and 50 characters long</Typography>}
                    {errors.password?.type === 'maxLength' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Password must be between 6 and 50 characters long</Typography>}
                    <TextField inputRef={register({ required: true, validate: (value) => value === watch('password') })} style={{ marginBottom: '10px' }} name='confirmPassword' label='Confirm Password' type='password' />
                    {errors.confirmPassword?.type === 'required' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Please confirm your password</Typography>}
                    {errors.confirmPassword?.type === 'validate' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Password and confirm password must both match</Typography>}
                    <Button type='submit' style={{ fontWeight: '400', color: 'white', marginTop: '10px', backgroundColor: 'rgb(213,152,107)' }}>Register</Button>
                </form>
                <p>or</p>
                <p>Already have an account? <NavLink to='/login'>Login Here</NavLink></p>
                <BottomNav />
            </div>
        }

        </>
    )
}

export default Register;
