import React, { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useForm } from 'react-hook-form'
import { Button } from '@material-ui/core';
import HikeTrackContext from '../context/HikeTrackContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const NewPost = () => {
    const { id, token } = useContext(HikeTrackContext)
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data, e) => {
        console.log(data)
        try {
            const res = await fetch(`${apiUrl}/posts/user/${id}`, {
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

    const closeForm = (e) => {
        const newPostForm = document.querySelector('.new-post')
        newPostForm.classList.add('new-post--hidden')
    }

    return (
        <div className='new-post new-post--hidden'>
            <form style={{ border: '1px solid grey', backgroundColor: 'rgb(153,153,153)', borderRadius: '2px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', width: '500px', padding: '0 20px 20px' }} onSubmit={handleSubmit(onSubmit)} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1 style={{ fontWeight: '400', color: 'white' }}>New Post</h1>
                    <button type='button' onClick={closeForm} style={{ height: '40px', marginTop: '10px', border: 'none', backgroundColor: 'transparent' }}>
                        <CloseIcon style={{ color: 'white', pointerEvents: 'none' }} />
                    </button>
                </div>
                <input style={{ marginBottom: '10px', fontFamily: 'Roboto', fontSize: '25px', borderRadius: '2px', border: 'none' }} ref={register()} name='title' placeholder='Title' type='text' />
                <textarea style={{ fontFamily: 'Roboto', fontSize: '15px', borderRadius: '2px', border: 'none', height: '150px', resize: 'none' }} ref={register()} name='text' placeholder='Caption' type='text' />
                <Button type='submit' style={{ border: '1px solid grey', backgroundColor: 'rgb(213,152,107)', marginTop: '20px', color: 'white' }}>Post</Button>
            </form>
        </div>
    )
}

export default NewPost;
