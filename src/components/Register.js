import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, NavLink } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core'

import HikeTrackContext from '../context/HikeTrackContext';

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const { register, handleSubmit, errors } = useForm();
    const { token, setToken } = useContext(HikeTrackContext);

    const onSubmit = async (data) => {
        console.log(data)
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
                console.log(data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1 style={{ color: 'rgb(153,153,153)', fontWeight: '400' }}>Create an Account</h1>
                <form style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', width: '400px' }} onSubmit={handleSubmit(onSubmit)}>
                    <TextField inputRef={register()} style={{ marginBottom: '10px' }} name='username' label='Username' type='text' />
                    <TextField inputRef={register()} style={{ marginBottom: '10px' }} name='firstName' label='First Name' type='text' />
                    <TextField inputRef={register()} style={{ marginBottom: '10px' }} name='lastName' label='Last Name' type='text' />
                    <TextField inputRef={register()} style={{ marginBottom: '10px' }} name='email' label='Email' type='text' />
                    <TextField inputRef={register()} style={{ marginBottom: '10px' }} name='password' label='Password' type='password' />
                    <TextField style={{ marginBottom: '10px' }} label='Confirm Password' type='password' />
                    <Button type='submit' style={{ fontWeight: '400', color: 'white', marginTop: '10px', backgroundColor: 'rgb(153,153,153)' }}>Register</Button>
                </form>
                <p>or</p>
                <p>Already have an account? <NavLink to='/login'>Login Here</NavLink></p>
            </div>
        </>
    )
}

export default Register;
