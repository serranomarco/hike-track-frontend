import React, { useContext, useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography } from '@material-ui/core'

import FeedNav from './FeedNav';
import BottomNav from './BottomNav';
import HikeTrackContext from '../context/HikeTrackContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const EditProfile = () => {
    const [user, setUser] = useState({})
    const { register, handleSubmit, errors } = useForm();
    const { username, token } = useContext(HikeTrackContext);

    const onSubmit = async (data, e) => {
        try {
            const res = await fetch(`${apiUrl}/users/user`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })

            if (res.ok) {
                const data = await res.json();
                console.log(data);
            }
        } catch (err) {
            console.error(err);
        }
        window.location.replace(`/${username}/profile`)
    }

    const updatePicture = async () => {
        const formData = new FormData();
        const fileField = document.querySelector('input[name="image"]');
        formData.append('image', fileField.files[0]);
        try {
            const res = await fetch(`${apiUrl}/users/user/picture`, {
                method: 'put',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            })
        } catch (err) {
            console.error(err)
        }
        window.location.reload()
    }

    const updateFirstName = (e) => {
        const { username, first_name, last_name, bio, profile_pic_url } = user
        setUser({ username, last_name, bio, first_name: e.target.value, profile_pic_url })
    }
    const updateLastName = (e) => {
        const { username, first_name, last_name, bio, profile_pic_url } = user
        setUser({ username, last_name: e.target.value, bio, first_name, profile_pic_url })
    }
    const updateBio = (e) => {
        const { username, first_name, last_name, bio, profile_pic_url } = user
        setUser({ username, last_name, bio: e.target.value, first_name, profile_pic_url })
    }

    const fetchUser = async () => {
        try {
            const res = await fetch(`${apiUrl}/users/user`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json()
                setUser(data)
            }
        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {
        fetchUser()
        // eslint-disable-next-line
    }, [setUser, token])

    return (
        <>
            <FeedNav />
            <div style={{ position: 'relative', top: '75px', bottom: '115px', right: '0', left: '0', marginBottom: '135px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
                <h1 style={{ color: 'rgb(153,153,153)', fontWeight: '400' }}>Edit Profile</h1>

                <form onSubmit={handleSubmit(updatePicture)} encType='multipart/form-data' style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px' }}>
                    <img style={{ borderRadius: '50%', height: '80px', width: '80px' }} alt='edit-profile' src={user.profile_pic_url} />
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label style={{ marginBottom: '10px' }} htmlFor='profile-pic'>Update Profile Picture</label>
                        <input style={{ width: '180px' }} name='image' type='file' accept='image/jpg' />
                        <Button type='submit' style={{ fontWeight: '400', fontSize: '10px', color: 'white', marginTop: '10px', backgroundColor: 'rgb(213,152,107)' }}>Update Picture</Button>
                    </div>
                </form>

                <form style={{ padding: '10px 20px', display: 'flex', flexDirection: 'column', width: '400px' }} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor='username'>Username: </label>
                        <input ref={register({ required: true })} style={{ marginBottom: '10px', width: '100%', cursor: 'not-allowed' }} name='username' label='Username' type='text' value={user.username} disabled />
                    </div>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input ref={register({ required: true })} style={{ marginBottom: '10px', width: '100%', cursor: 'not-allowed' }} name='email' label='Email' type='text' value={user.email} disabled />
                    </div>
                    <div>
                        <label htmlFor='first_name'>First Name: </label>
                        <input ref={register({ required: true })} style={{ marginBottom: '10px', width: '100%' }} onChange={updateFirstName} name='first_name' label='First Name' type='text' value={user.first_name} />
                    </div>
                    <div>
                        <label htmlFor='last_name'>Last Name: </label>
                        <input ref={register({ required: true })} style={{ marginBottom: '10px', width: '100%' }} name='last_name' type='text' onChange={updateLastName} value={user.last_name} />
                    </div>
                    <div>
                        <label htmlFor='bio'>Bio: </label>
                        <textarea ref={register()} rows={4} style={{ marginBottom: '10px', width: '100%', fontFamily: 'Roboto', resize: 'none' }} name='bio' type='text' onChange={updateBio} value={user.bio} />
                    </div>
                    {errors.password && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px' }} > Please enter a password</Typography>}
                    <Button type='submit' style={{ fontWeight: '400', color: 'white', marginTop: '10px', backgroundColor: 'rgb(213,152,107)' }}>Save Changes</Button>
                    <NavLink style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }} to={`/${username}/profile`}><Button type='button' style={{ width: '100%', fontWeight: '400', color: 'white', marginTop: '10px', backgroundColor: 'rgb(213,152,107)' }}>Cancel</Button></NavLink>
                </form>
            </div>
            <BottomNav />
        </>

    )
}

export default EditProfile;