import React from 'react';

const ProfileComponent = ({ props: { user, userPosts } }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ borderBottom: '1px solid lightgrey', marginBottom: '20px', marginTop: '50px', padding: '10px', boxSizing: 'border-box', width: '500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <img style={{ borderRadius: '50%', height: '80px', width: '80px', marginRight: '20px' }} alt='profile' src={user.profile_pic_url} />
                    <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        </div>
                        <p style={{ fontWeight: '600', marginBottom: '0px' }}>{user.first_name} {user.last_name}</p>
                        <div style={{ display: 'flex' }}>
                            <p style={{ fontSize: '15px', marginRight: '10px' }}>{userPosts.length} posts</p>
                            <p style={{ fontSize: '15px', marginRight: '10px' }}>0 followers</p>
                            <p style={{ fontSize: '15px' }}>0 following</p>
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