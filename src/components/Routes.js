import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import Landing from './Landing';

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
        </Switch>
    )
}

export default Routes;
