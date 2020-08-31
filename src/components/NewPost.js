import React, { useContext, useState, useEffect } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useForm } from 'react-hook-form'
import { Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import HikeTrackContext from '../context/HikeTrackContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const NewPost = () => {
    const { id, token } = useContext(HikeTrackContext)
    const { register, handleSubmit, errors } = useForm();
    const [locations, setLocations] = useState([]);

    const getLocations = async () => {
        try {
            const res = await fetch(`${apiUrl}/locations`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if (res.ok) {
                const data = await res.json();
                setLocations(data)
            }
        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        getLocations()
    }, [setLocations])

    const onSubmit = async (data, e) => {
        const formData = new FormData();
        const fileField = document.querySelector('input[name="image"]');
        const titleField = document.querySelector('input[name="title"]');
        const textField = document.querySelector('textarea[name="text"]');
        const locationField = document.querySelector('select[name=location]');
        formData.append('image', fileField.files[0]);
        formData.append('title', titleField.value);
        formData.append('text', textField.value);
        formData.append('location', locationField.value)
        try {
            const res = await fetch(`${apiUrl}/posts/user/${id}`, {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
        } catch (err) {
            console.error(err)
        }
        window.location.reload()
    }

    const closeForm = (e) => {
        const newPostForm = document.querySelector('.new-post')
        newPostForm.classList.add('new-post--hidden')
    }

    return (
        <div className='new-post new-post--hidden'>
            <form encType='multipart/form-data' style={{ border: '1px solid grey', backgroundColor: 'rgb(153,153,153)', borderRadius: '2px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', width: '500px', padding: '0 20px 20px' }} onSubmit={handleSubmit(onSubmit)} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ fontWeight: '400', color: 'white' }}>New Post</h1>
                    <button type='button' onClick={closeForm} style={{ height: '40px', marginTop: '10px', border: 'none', backgroundColor: 'transparent' }}>
                        <CloseIcon style={{ color: 'white', pointerEvents: 'none' }} />
                    </button>
                </div>
                <div style={{ marginBottom: '10px', marginTop: '0', display: 'flex', alignItems: 'center' }}>
                    <p style={{ marginRight: '10px' }}>Image (optional):</p>
                    <input type='file' accept='image/jpeg' name='image' />
                </div>
                <div>
                    <label htmlFor='location'>Location: </label>
                    <select name='location' ref={register()} style={{ marginBottom: '10px', fontFamily: 'Roboto', fontSize: '18px', color: 'inherit', borderRadius: '2px', border: 'none' }}>
                        <option value={null}>None</option>
                        {locations.map((location) => {
                            return (
                                <option key={location.id} value={location.id}>{location.name}</option>
                            )
                        })}
                    </select>
                </div>
                <input style={{ marginBottom: '10px', fontFamily: 'Roboto', fontSize: '25px', borderRadius: '2px', border: 'none' }} ref={register({ required: true, maxLength: 255 })} name='title' placeholder='Title' type='text' />
                {errors.title?.type === 'required' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Please enter a title</Typography>}
                {errors.title?.type === 'maxLength' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px' }}>Please make sure title is less than 255 characters</Typography>}
                <textarea style={{ fontFamily: 'Roboto', fontSize: '15px', borderRadius: '2px', border: 'none', height: '150px', resize: 'none' }} ref={register({ required: true })} name='text' placeholder='Caption' type='text' />
                {errors.text?.type === 'required' && <Typography style={{ backgroundColor: '#f8d7da', padding: '0 10px', borderRadius: '5px', marginBottom: '10px', marginTop: '10px' }}>Please enter a caption</Typography>}
                <Button type='submit' style={{ border: '1px solid grey', backgroundColor: 'rgb(213,152,107)', marginTop: '20px', color: 'white' }}>Post</Button>
            </form>
        </div>
    )
}

export default NewPost;
