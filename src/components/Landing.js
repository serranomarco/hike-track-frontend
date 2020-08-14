import React from 'react';

import Login from './Login'
import BottomNav from './BottomNav'
import TopNav from './TopNav';

const Landing = () => {
    return (
        <>
            <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                left: '0',
                bottom: '0',
                backgroundImage: 'url("https://hike-track-app.s3-us-west-2.amazonaws.com/hiking.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ color: 'white', padding: '0px 10px' }}>Keep track of all your favorite locations</h1>
                    <h1 style={{ color: 'white', padding: '0px 10px' }}>Discover new hikes</h1>
                    <h1 style={{ color: 'white', padding: '0px 10px' }}>Meet new people</h1>
                </div>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '5px', padding: '10px 10px' }}>
                    <Login />
                </div>
            </div>
            <TopNav />
            <BottomNav />
        </>
    )
}

export default Landing;
