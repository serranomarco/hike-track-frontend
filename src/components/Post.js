import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import { IconButton, Button, Menu, MenuItem } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import HikeTrackContext from '../context/HikeTrackContext';


const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const Post = ({ post }) => {
    const { posts, token, setCurrentPost, likedPosts, setOpen, setAnchorEl, anchorEl, setCurrentPostId } = useContext(HikeTrackContext);
    const { register, handleSubmit, errors } = useForm();

    const convertLocationToSwordCase = location => {
        return location.split(' ').map((el) => el.toLowerCase()).join('-')
    }


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

    return (
        <div key={post.id} style={{ marginTop: '20px', padding: '10px 0', border: '1px solid rgba(153, 153, 153, 0.5)', borderRadius: '2px', width: '500px' }}>
            {post.photo_url &&
                <>
                    <div>
                        <p style={{ paddingLeft: '20px', fontWeight: '500', marginTop: '10px', marginBottom: '20px' }}>{post.username}</p>
                    </div>
                    <div>
                        <img alt='post' style={{ width: '500px', height: '500px' }} src={post.photo_url} />
                    </div>
                </>
            }
            <div style={{ padding: '0 20px' }}>
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
                {post.location &&
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <LocationOnIcon />
                            <NavLink style={{ color: 'rgb(213,152,107)', textDecoration: 'none' }} to={`/location/${convertLocationToSwordCase(post.location)}`}>{post.location}</NavLink>
                        </div>
                    </>}
                <p style={{ fontSize: '18px', margin: '0px' }}>{post.text}</p>
            </div>
            <div style={{ padding: '0 20px 10px', display: 'flex', justifyContent: 'space-between' }}>
                <form key={post.id} id={post.id} style={{ display: 'flex' }} onSubmit={handleSubmit(async (data, e) => {
                    const userId = localStorage.getItem('id');
                    console.log(data)
                    try {
                        const res = await fetch(`${apiUrl}/posts/${post.id}/user/${userId}/comment`, {
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(data)
                        });

                        if (res.ok) {
                            const data = await res.json();
                        }
                    } catch (err) {
                        console.error(err)
                    }
                    window.location.reload()
                })}>
                    <textarea rows={1} className='comment' style={{ marginTop: '20px', fontFamily: 'Roboto', fontSize: '15px', borderRadius: '2px', border: '1px solid rgba(153, 153, 153, 0.5)', width: '300px', resize: 'none' }} ref={register()} name={`comment`} placeholder='Leave a comment' type='text' />
                    <button type='submit' style={{ marginTop: '20px', marginLeft: '5px', height: '25px', border: 'none', borderRadius: '2px', fontFamily: 'Roboto', backgroundColor: 'rgb(213, 152, 107)', color: 'white' }}>Post</button>
                </form>
                <div style={{ marginTop: '20px' }}>
                    <IconButton onClick={async (e) => {
                        e.preventDefault()
                        console.log(post.id)
                        const likeButton = document.getElementById(`like-${post.id}`)
                        if (likeButton.getAttribute('liked') === 'true') {
                            likeButton.removeAttribute('style')
                            likeButton.style.pointerEvents = 'none'
                            likeButton.setAttribute('liked', 'false')
                            try {
                                const res = await fetch(`${apiUrl}/posts/${post.id}/like`, {
                                    method: 'delete',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    }
                                })
                                if (res.ok) {
                                    const data = await res.json();
                                    console.log(data)
                                }
                            } catch (err) {
                                console.error(err);
                            }
                        } else {
                            likeButton.style.color = 'red'
                            likeButton.setAttribute('liked', 'true')
                            try {
                                const res = await fetch(`${apiUrl}/posts/${post.id}/like`, {
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
                        }
                    }} style={{ padding: '0px', marginRight: '10px' }}>
                        {likedPosts.includes(Number.parseInt(post.id)) ? <FavoriteIcon id={`like-${post.id}`} liked='true' style={{ color: 'red', pointerEvents: 'none' }} /> : <FavoriteIcon id={`like-${post.id}`} liked='false' style={{ pointerEvents: 'none' }} />}
                    </IconButton>
                    <IconButton post-id={post.id} onClick={showModal} style={{ padding: '0px' }}>
                        <EditIcon style={{ pointerEvents: 'none' }} />
                    </IconButton>
                </div>
            </div>
            <div>
                {post.comments.map((comment) => {
                    return (
                        <div key={comment.id} style={{ display: 'flex', marginLeft: '40px', marginTop: '10px', marginBottom: '10px' }}>
                            <p style={{ margin: '0px', fontWeight: '500', marginRight: '5px', color: 'black', fontSize: '13px' }}>{comment.username}:</p>
                            <p style={{ margin: '0px', fontSize: '13px' }}>{comment.comment}</p>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Post;
