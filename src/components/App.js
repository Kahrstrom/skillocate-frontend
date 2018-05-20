import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './privateroute'
import PublicApp from './publicapp'
import PrivateApp from './privateapp'
import withTheme from '../utils/withTheme'


const App = () => (
    <Switch>
        <Route path='/public' exact component={PublicApp} />
        <PrivateRoute path='/' component={PrivateApp} />
    </Switch>
)

export default withTheme(App)
