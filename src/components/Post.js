import React, { useContext } from 'react';
import { useForm } from 'react-hook-form'
import { Button, TextField } from '@material-ui/core';
import HikeTrackContext from '../context/HikeTrackContext';


const Post = () => {
    const { posts } = useContext(HikeTrackContext);

    return (
        posts.map(post => {
            return (
                <div key={post.id}>Hello</div>
            )
        })
    )
}

export default Post;
