import React, { useContext } from 'react';
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


const Routes = () => {

    const { username, needLogin } = useContext(HikeTrackContext);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <PrivateRoute path={`/${username}/feed`} component={Feed} needLogin={needLogin} />
                <PrivateRoute path={`/${username}/profile`} component={UserProfile} needLogin={needLogin} />
                <PrivateRoute path={`/${username}/edit`} component={EditProfile} needLogin={needLogin} />
                <Route path='/:username/profile' component={Profile} />
                <PrivateRoute path='/locations' component={Locations} needLogin={needLogin} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
