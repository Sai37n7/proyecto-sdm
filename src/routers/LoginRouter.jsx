import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'
import {Login} from '../pages/Login'
import { AppRouter } from './AppRouter'
import { PublicRouter } from './PublicRouter'
import {Privaterouter } from './Privaterouter'

export const LoginRouter = () => {

    const {log} = useContext(AuthContext)

    return (
        <Router>
            <Switch>
                <PublicRouter exact path="/login" component={Login}/>
                <Privaterouter path="/" auth={log} component={AppRouter}/>
            </Switch>
        </Router>
    )
}
