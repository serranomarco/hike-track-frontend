import React, { useContext, useState, useEffect } from 'react';

import { Button } from '@material-ui/core'

import HikeTrackContext from '../context/HikeTrackContext'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const ProfileComponent = ({ props: { user, userPosts } }) => {

    const { token } = useContext(HikeTrackContext)
    const [follow, setFollow] = useState(false);

    const fetchFollow = async () => {
        try {
            const res = await fetch(`${apiUrl}/users/${user.id}/follow`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                if (data.message) {
                    setFollow(true)
                }
            }

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchFollow()
    }, [user.id])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ borderBottom: '1px solid lightgrey', marginBottom: '20px', marginTop: '50px', padding: '10px', boxSizing: 'border-box', width: '500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <img style={{ borderRadius: '50%', height: '80px', width: '80px', marginRight: '20px' }} alt='profile' src={user.profile_pic_url} />
                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ color: 'black', fontSize: '20px', marginBottom: '0px' }}>@{user.username}</p>
                            {follow ? <Button style={{ color: 'white', marginTop: '20px', marginRight: '20px', backgroundColor: 'rgb(153, 153, 153)' }} onClick={async () => {
                                try {
                                    const res = await fetch(`${apiUrl}/users/${user.id}/follow`, {
                                        method: 'delete',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        }
                                    });
                                    if (res.ok) {
                                        const data = await res.json();
                                        console.log(data)
                                    }

                                } catch (err) {
                                    console.error(err)
                                }
                                window.location.reload()
                            }}>Unfollow</Button> : <Button style={{ color: 'white', marginTop: '20px', marginRight: '20px', backgroundColor: 'rgb(213, 152, 107)' }} onClick={async () => {
                                try {
                                    const res = await fetch(`${apiUrl}/users/${user.id}/follow`, {
                                        method: 'post',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        }
                                    });
                                    if (res.ok) {
                                        const data = await res.json();
                                        console.log(data)
                                    }

                                } catch (err) {
                                    console.error(err)
                                }
                                window.location.reload()
                            }}>Follow </Button>}

                        </div>
                        <p style={{ fontWeight: '600', marginBottom: '0px' }}>{user.first_name} {user.last_name}</p>
                        <div style={{ display: 'flex' }}>
                            <p style={{ fontSize: '15px', marginRight: '10px' }}>{userPosts.length} posts</p>
                            <p style={{ fontSize: '15px', marginRight: '10px' }}>{user.followers?.length} followers</p>
                            <p style={{ fontSize: '15px' }}>{user.following?.length} following</p>
                        </div>

                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ width: '500px', paddingLeft: '10px', paddingRight: '10px', boxSizing: 'border-box' }}>{user.bio}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent;