import React, { useContext } from 'react';
import { useForm } from 'react-hook-form'

import { IconButton, Button, Menu, MenuItem } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import HikeTrackContext from '../context/HikeTrackContext';


const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const Post = () => {
    const { posts, token, setCurrentPost, likedPosts, setOpen, setAnchorEl, anchorEl, setCurrentPostId } = useContext(HikeTrackContext);
    const { register, handleSubmit, errors } = useForm();


    const handleOpen = () => {
        setOpen(true)
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
        setCurrentPostId(e.target.parentElement.getAttribute('post-id'));
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const onSubmit = async (data, e) => {
        e.preventDefault()
        const postId = e.target.getAttribute('id');
        const userId = localStorage.getItem('id');
        console.log(data)
        try {
            const res = await fetch(`${apiUrl}/posts/${postId}/user/${userId}/comment`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                const data = await res.json();
                console.log(data)
            }
        } catch (err) {
            console.error(err)
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        const postId = e.target.getAttribute('post-id')
        const form = document.getElementById(postId)
        form.submit((e) => {
            e.preventDefault()
            console.log(e.target)
            return e.target
        })
    }

    const showModal = async (e) => {
        try {
            const postId = e.target.parentElement.getAttribute('post-id');
            const res = await fetch(`${apiUrl}/posts/${postId}`);
            if (res.ok) {
                const data = await res.json()
                setCurrentPost(data)
            }
        } catch (err) {
            console.error(err)
        }
        const modal = document.querySelector('.edit-post');
        modal.classList.remove('edit-post--hidden');
    }

    const likePost = async (e) => {
        const postId = e.target.parentElement.getAttribute('post-id');
        console.log(likedPosts.includes(Number.parseInt(postId)))
        if (!likedPosts.includes(Number.parseInt(postId))) {
            try {
                const res = await fetch(`${apiUrl}/posts/${postId}/like`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })
                if (res.ok) {
                    const data = await res.json();
                    console.log(data)
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            try {
                const res = await fetch(`${apiUrl}/posts/${postId}/like`, {
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
            } catch (err) {
                console.error(err);
            }
        }
        window.location.reload()
    }

    return (
        posts.map(post => {
            return (
                <div key={post.id} style={{ marginTop: '20px', padding: '10px 20px', border: '1px solid rgba(153, 153, 153, 0.5)', borderRadius: '2px', width: '500px' }}>
                    {post.photo_url ?
                        <div>
                            <p style={{ fontWeight: '500', marginTop: '10px' }}>{post.username}</p>
                        </div> : ''}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ fontWeight: '500', marginRight: '15px' }}>{post.username}</p>
                                <p style={{ fontSize: '30px', fontWeight: '500', margin: '0px' }}>{post.title}</p>
                            </div>
                            <Button style={{ width: '30px', minWidth: '30px' }} post-id={post.id} onClick={handleClick}>
                                <MoreVertIcon style={{ pointerEvents: 'none' }} />
                            </Button>
                            <Menu anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}>
                                <MenuItem onClick={handleOpen}>Delete Post</MenuItem>
                            </Menu>
                        </div>
                        <p style={{ fontSize: '18px', margin: '0px' }}>{post.text}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <form key={post.id} id={post.id} style={{ display: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
                            <textarea rows={1} className='comment' style={{ marginTop: '20px', fontFamily: 'Roboto', fontSize: '15px', borderRadius: '2px', border: '1px solid rgba(153, 153, 153, 0.5)', width: '300px', resize: 'none' }} ref={register()} name={`comment`} placeholder='Leave a comment' type='text' />
                            <button post-id={post.id} style={{ marginTop: '20px', marginLeft: '5px', height: '25px', border: 'none', borderRadius: '2px', fontFamily: 'Roboto', backgroundColor: 'rgb(213, 152, 107)', color: 'white' }} onClick={submitForm} type='button'>Post</button>
                        </form>
                        <div style={{ marginTop: '20px' }}>
                            <IconButton post-id={post.id} onClick={likePost} style={{ padding: '0px', marginRight: '10px' }}>
                                {likedPosts.includes(Number.parseInt(post.id)) ? <FavoriteIcon style={{ color: 'red', pointerEvents: 'none' }} /> : <FavoriteBorderOutlinedIcon style={{ pointerEvents: 'none' }} />}
                            </IconButton>
                            <IconButton post-id={post.id} onClick={showModal} style={{ padding: '0px' }}>
                                <EditIcon style={{ pointerEvents: 'none' }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default Post;
