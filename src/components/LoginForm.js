import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core'

import HikeTrackContext from '../context/HikeTrackContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const LoginForm = () => {
    const [loginError, setLoginError] = useState('');
    const { register, handleSubmit, errors } = useForm();
    const { token, setToken } = useContext(HikeTrackContext);

    const onSubmit = async (data) => {
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
                console.log(data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <form style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', width: '400px' }} onSubmit={handleSubmit(onSubmit)}>
                <TextField inputRef={register()} style={{ marginBottom: '10px' }} name='email' label='Email' type='text' />
                <TextField inputRef={register()} style={{ marginBottom: '10px' }} name='password' label='Password' type='password' />
                <Button type='submit' style={{ fontWeight: '400', color: 'white', marginTop: '10px', backgroundColor: 'rgb(153,153,153)' }}>Log In</Button>
            </form>
        </>
    )
}

export default LoginForm;
