import React, { useEffect, useState, useContext } from 'react';

import FeedNav from './FeedNav';
import BottomNav from './BottomNav';
import Post from './Post';
import ProfileComponent from './ProfileComponent'
import HikeTrackContext from '../context/HikeTrackContext';

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const Profile = ({ user }) => {

    const [userPosts, setUserPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([]);
    const { token } = useContext(HikeTrackContext)

    const fetchPosts = async () => {
        try {
            const res = await fetch(`${apiUrl}/posts/user/${user.id}`,
                {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

            if (res.ok) {
                const data = await res.json();
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
                <ProfileComponent props={{ 'userPosts': userPosts, 'user': user }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {userPosts.map((post) => {
                        return <Post key={post.id} post={post} />
                    })}
                </div>
            </div>
            <FeedNav />
            <BottomNav />
        </>
    );
}

export default Profile;