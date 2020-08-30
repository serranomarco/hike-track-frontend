import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@material-ui/core'

import HikeTrackContext from '../context/HikeTrackContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const LocationForm = () => {
    const { register, handleSubmit, errors } = useForm();
    const { token } = useContext(HikeTrackContext)

    const onSubmit = async (data, e) => {
        try {
            const res = await fetch(`${apiUrl}/locations`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
        } catch (err) {
            console.error(err)
        }
        window.location.reload()
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '-30px' }}>
            <h1 style={{ color: 'rgb(153,153,153)', fontWeight: '400' }}>Create a New Location</h1>
            <form style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', width: '300px' }} onSubmit={handleSubmit(onSubmit)}>
                <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='name' label='Name of Hike' type='text' />
                {errors.name && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px' }}>Please enter a location</Typography>}
                <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='city' label='City' type='text' />
                {errors.city && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px' }}>Please enter a city</Typography>}
                <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='state' label='State' type='text' />
                {errors.state && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px' }}>Please enter a state</Typography>}
                <TextField inputRef={register({ required: true })} style={{ marginBottom: '10px' }} name='country' label='Country' type='text' />
                {errors.country && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px' }}>Please enter a country</Typography>}
                <TextField multiline rows={2} inputRef={register()} style={{ marginBottom: '10px', }} name='description' label='Description' type='text' />
                <input ref={register({ required: true })} style={{ marginBottom: '10px', height: '40px', border: 'none', borderBottom: '1px solid grey', fontSize: '16px' }} step='any' placeholder='Longitude' name='latitude' label='Latitude' type='number' />
                {errors.latitude && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px' }}>Please enter a latitude</Typography>}
                <input ref={register({ required: true })} style={{ marginBottom: '10px', height: '40px', border: 'none', borderBottom: '1px solid grey', fontSize: '16px' }} step='any' placeholder='Longitude' name='longitude' label='Longitude' type='number' />
                {errors.longitude && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px' }}>Please enter a longitude</Typography>}
                <Button type='submit' style={{ fontWeight: '400', color: 'white', marginTop: '10px', backgroundColor: 'rgb(213,152,107)' }}>New Location</Button>
            </form>
        </div>
    )
}

export default LocationForm;