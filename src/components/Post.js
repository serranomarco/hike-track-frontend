import React, { useContext } from 'react';
import { useForm } from 'react-hook-form'

import { IconButton, TextField, Icon } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import HikeTrackContext from '../context/HikeTrackContext';

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const Post = () => {
    const { posts } = useContext(HikeTrackContext);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data, e) => {
        const postId = e.target.getAttribute('id');
        const res = await fetch(`${apiUrl}/`)
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
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <p style={{ fontWeight: '500', marginRight: '15px' }}>{post.username}</p>
                            <p style={{ fontSize: '30px', fontWeight: '500', margin: '0px' }}>{post.title}</p>
                        </div>
                        <p style={{ fontSize: '18px', margin: '0px' }}>{post.text}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <form id={post.id} style={{ display: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
                            <textarea className='comment' rows={1} style={{ marginTop: '20px', fontFamily: 'Roboto', fontSize: '15px', borderRadius: '2px', border: '1px solid rgba(153, 153, 153, 0.5)', width: '300px', resize: 'none' }} ref={register()} name='comment' placeholder='Leave a comment' type='text' />
                            <button style={{ marginTop: '20px', marginLeft: '5px', height: '25px', border: 'none', borderRadius: '2px', fontFamily: 'Roboto', backgroundColor: 'rgb(213, 152, 107)', color: 'white' }} type='submit'>Post</button>
                        </form>
                        <div style={{ marginTop: '20px' }}>
                            <IconButton style={{ padding: '0px', marginRight: '10px' }}>
                                <FavoriteBorderOutlinedIcon />
                            </IconButton>
                            <IconButton style={{ padding: '0px' }}>
                                <EditIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default Post;
