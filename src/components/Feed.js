import React, { useEffect, useContext } from 'react';

import { Button, Modal } from '@material-ui/core';

import BottomNav from './BottomNav'
import Post from './Post'
import FeedNav from './FeedNav'
import HikeTrackContext from '../context/HikeTrackContext';
import NewPost from './NewPost';
import PostEditModal from './PostEditModal';

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const Feed = () => {
    const { id, token, posts, setPosts, setLikedPosts, open, setOpen, setAnchorEl, currentPostId } = useContext(HikeTrackContext);

    const handleClose = () => {
        setOpen(false)
        setAnchorEl(null)
    }

    const createNewPostForm = () => {
        const newPostForm = document.querySelector('.new-post')
        if (newPostForm.classList.contains('new-post--hidden')) {
            newPostForm.classList.remove('new-post--hidden')
        }
    }

    const deletePost = async (e) => {
        try {
            const res = await fetch(`${apiUrl}/posts/${currentPostId}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

        } catch (err) {
            console.error(err)
        }
        window.location.reload()
    }

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${apiUrl}/posts/user/${id}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

            if (res.ok) {
                const data = await res.json();
                setPosts(data.posts);
                setLikedPosts(data.liked_posts);
            }

        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line
    }, [setPosts, token, setLikedPosts])

    return (
        <>
            <div style={{ position: 'relative', top: '75px', bottom: '115px', right: '0', left: '0', marginBottom: '135px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '40px', flexDirection: 'column' }}>
                    <Button onClick={createNewPostForm} style={{ marginBottom: '20px', backgroundColor: 'rgb(213,152,107)', color: 'white', fontWeight: '400', width: '500px' }}>Create a Post</Button>
                    <NewPost />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {posts.map((post) => {
                        return <Post key={post.id} post={post} />
                    })}
                </div>
            </div>
            <FeedNav />
            <BottomNav />
            <PostEditModal />
            <Modal className='delete-modal' style={{ border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }} open={open} onClose={handleClose}>
                <div style={{ backgroundColor: 'rgb(153, 153, 153)', width: '500px', padding: '20px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <p style={{ color: 'white' }}>Are you sure you want to delete this post?</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <Button onClick={deletePost} style={{ color: 'white', backgroundColor: 'rgb(213, 152, 107)' }}>Yes</Button>
                        <Button onClick={handleClose} style={{ color: 'white', backgroundColor: 'rgb(213, 152, 107)' }}>No</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Feed;
