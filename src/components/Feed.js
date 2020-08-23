import React, { useState, useEffect, useContext } from 'react';

import { Button, TextField } from '@material-ui/core';

import BottomNav from './BottomNav'
import Post from './Post'
import FeedNav from './FeedNav'
import HikeTrackContext from '../context/HikeTrackContext';
import NewPost from './NewPost';

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const Feed = () => {
    const { id, token, setPosts } = useContext(HikeTrackContext);


    const createNewPostForm = () => {
        const newPostForm = document.querySelector('.new-post')
        if (newPostForm.classList.contains('new-post--hidden')) {
            newPostForm.classList.remove('new-post--hidden')
        }
    }

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${apiUrl}/posts/user/${id}`);

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setPosts(data);
            }

        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {
        fetchPosts();
    }, [setPosts, token])

    return (
        <>
            <div style={{ position: 'relative', top: '75px', bottom: '115px', right: '0', left: '0', marginBottom: '135px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', flexDirection: 'column' }}>
                    <Button onClick={createNewPostForm} style={{ marginBottom: '20px', backgroundColor: 'rgb(213,152,107)', color: 'white', fontWeight: '400', width: '500px' }}>Create a Post</Button>
                    <NewPost />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Post />
                </div>
            </div>
            <FeedNav />
            <BottomNav />
        </>
    )
}

export default Feed;
