import React, { useState, useEffect, useContext } from 'react';

import BottomNav from './BottomNav'
import Post from './Post'
import FeedNav from './FeedNav'
import HikeTrackContext from '../context/HikeTrackContext';

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const Feed = () => {
    const { id, token } = useContext(HikeTrackContext);
    const [posts, setPosts] = useState([]);

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
            <FeedNav />
            <Post />
            <BottomNav />
        </>
    )
}

export default Feed;
