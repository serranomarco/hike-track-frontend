import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@material-ui/core'


const LocationForm = () => {
    const [loginError, setLoginError] = useState('');
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (e, data) => {

    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '-30px' }}>
            <h1 style={{ color: 'rgb(153,153,153)', fontWeight: '400' }}>New Location</h1>
            <form style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', width: '300px' }} onSubmit={handleSubmit(onSubmit)}>
                {loginError && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Login failed, please try again</Typography>}
                <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='name' label='Name of Hike' type='text' />
                {errors.email && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px' }}>Please enter an email</Typography>}
                <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='city' label='City' type='text' />
                <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='state' label='State' type='text' />
                <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='country' label='Country' type='text' />
                <TextField multiline inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='country' label='Country' type='text' />
                <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='latitude' label='Latitude' type='number' />
                <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='longitude' label='Longitude' type='number' />

                <Button type='submit' style={{ fontWeight: '400', color: 'white', marginTop: '10px', backgroundColor: 'rgb(213,152,107)' }}>Log In</Button>
            </form>
        </div>
    )
}

export default LocationForm;