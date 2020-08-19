import React from 'react';
import { Button } from '@material-ui/core';

const Post = () => {
    return (
        <div style={{ position: 'absolute', top: '75px', bottom: '115px', right: '0', left: '0' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Button style={{ backgroundColor: 'rgb(153, 153, 153)', color: 'white', fontWeight: '400', width: '500px' }}>Create a Post</Button>
            </div>
        </div>
    )
}

export default Post;
