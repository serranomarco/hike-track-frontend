import React, { useContext, useState, useEffect } from 'react';

import FeedNav from './FeedNav';
import BottomNav from './BottomNav';
import Post from './Post';
import PostEditModal from './PostEditModal'
import HikeTrackContext from '../context/HikeTrackContext';

import { Button, Modal } from '@material-ui/core';

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const UserProfile = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState({});
    const { token, id, setLikedPosts, open, setOpen, setAnchorEl, currentPostId } = useContext(HikeTrackContext)

    const fetchUser = async () => {
        try {
            const res = await fetch(`${apiUrl}/users/user`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json()
                console.log(data)
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

    const handleClose = () => {
        setOpen(false)
        setAnchorEl(null)
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
            if (res.ok) {
                const data = await res.json();
                console.log(data)
            }

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
                console.log(data)
                setUserPosts(data.posts);
                setLikedPosts(data.liked_posts);
            }

        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line
    }, [setUserPosts, token, setLikedPosts])
    return (
        <>
            <div style={{ position: 'relative', top: '75px', bottom: '115px', right: '0', left: '0', marginBottom: '135px' }} >
                <div>
                    <img alt='profile' src={user.profile_pic_url} />
                    <p>{user.username}</p>
                    <p>{user.first_name} {user.last_name}</p>
                    <p>{user.bio}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {userPosts.map((post) => {
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
    );
}

export default UserProfile;