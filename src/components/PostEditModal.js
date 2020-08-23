import React, { useContext } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { useForm } from 'react-hook-form'
import { Button } from '@material-ui/core';
import HikeTrackContext from '../context/HikeTrackContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const PostEditModal = () => {
    const { id, currentPost, setCurrentPost, token } = useContext(HikeTrackContext)
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data, e) => {
        const postId = e.target.getAttribute('post-id');
        try {
            const res = await fetch(`${apiUrl}/posts/${postId}/user/${id}`,
                {
                    method: 'put',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                })
            if (res.ok) {
                const data = await res.json()
                console.log(data)
            }
        } catch (err) {
            console.error(err)
        }
        window.location.reload()
    }

    const closeForm = (e) => {
        const modal = document.querySelector('.edit-post');
        modal.classList.add('edit-post--hidden');
    }

    const updateTitle = (e) => {
        setCurrentPost({ id: currentPost.id, title: e.target.value, text: currentPost.text })
    }

    const updateText = (e) => {
        setCurrentPost({ id: currentPost.id, title: currentPost.title, text: e.target.value })
    }

    return (
        <div className='edit-post edit-post--hidden'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: '0', right: '0', left: '0', bottom: '0', backgroundColor: 'rgba(213,152,107,0.3)' }}>
                <form post-id={currentPost.id} style={{ border: '1px solid grey', backgroundColor: 'rgb(153,153,153)', borderRadius: '2px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', width: '500px', padding: '0 20px 20px' }} onSubmit={handleSubmit(onSubmit)} >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h1 style={{ fontWeight: '400', color: 'white' }}>Edit Post</h1>
                        <button type='button' onClick={closeForm} style={{ height: '40px', marginTop: '10px', border: 'none', backgroundColor: 'transparent' }}>
                            <CloseIcon style={{ color: 'white', pointerEvents: 'none' }} />
                        </button>
                    </div>
                    <input style={{ marginBottom: '10px', fontFamily: 'Roboto', fontSize: '25px', borderRadius: '2px', border: 'none' }} ref={register()} name='title' type='text' value={currentPost.title} onChange={updateTitle} />
                    <textarea style={{ fontFamily: 'Roboto', fontSize: '15px', borderRadius: '2px', border: 'none', height: '150px', resize: 'none' }} ref={register()} name='text' type='text' value={currentPost.text} onChange={updateText} />
                    <Button type='submit' style={{ border: '1px solid grey', backgroundColor: 'rgb(213,152,107)', marginTop: '20px', color: 'white' }}>Update</Button>
                </form>
            </div>
        </div>
    )
}

export default PostEditModal;
