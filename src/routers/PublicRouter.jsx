import React from 'react'
import { Route, Redirect } from 'react-router'

export const PublicRouter = ({ auth, component: Component, ...rest }) => {
    return (
        <Route
            {...rest} 
            component={(props) => !auth ? <Component {...props} /> : <Redirect to="/" />} />
    )
}
