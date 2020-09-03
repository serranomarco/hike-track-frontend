import React, { useContext, useEffect, useState } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import HikeTrackContext from '../context/HikeTrackContext'
import Register from './Register';
import Login from './Login';
import Landing from './Landing';
import Feed from './Feed'
import Locations from './Locations'
import UserProfile from './UserProfile'
import { PrivateRoute } from './routesUtil'
import EditProfile from './EditProfile';
import Profile from './Profile'

const apiUrl = process.env.REACT_APP_API_SERVER_BASE_URL;

const Routes = () => {

    const [allUsers, setAllUsers] = useState([]);
    const { username, needLogin, token } = useContext(HikeTrackContext);

    const fetchAllUsers = async () => {
        try {
            const res = await fetch(`${apiUrl}/users/all`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setAllUsers(data);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [setAllUsers])

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                {allUsers.map((user) => {
                    return (
                        <Route key={user.id} exact path={`/${user.username}/profile`} render={(props) => {
                            return <Profile user={user} />
                        }} />
                    )
                })}
                <PrivateRoute path={`/${username}/feed`} component={Feed} needLogin={needLogin} />
                <PrivateRoute path={`/${username}/profile`} component={UserProfile} needLogin={needLogin} />
                <PrivateRoute path={`/${username}/edit`} component={EditProfile} needLogin={needLogin} />
                <PrivateRoute path='/locations' component={Locations} needLogin={needLogin} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
