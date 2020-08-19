import React, { useContext } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';

import HikeTrackContext from '../context/HikeTrackContext'
import Register from './Register';
import Login from './Login';
import Landing from './Landing';
import Feed from './Feed'
import { PrivateRoute } from './routesUtil'

const Routes = () => {

    const { username, needLogin } = useContext(HikeTrackContext);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <PrivateRoute path={`/${username}/feed`} component={Feed} needLogin={needLogin} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
