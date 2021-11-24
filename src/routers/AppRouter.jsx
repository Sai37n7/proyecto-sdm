import React from 'react'
import Navbar from '../components/Navbar'
import { Switch ,Route } from 'react-router-dom';
import Inventario from '../pages/Inventario';
import Pedidos from '../pages/Pedidos'

export const AppRouter = () => {
    return (
        <>
            <Navbar/>
            <Switch>
                <Route exact path="/inventario" component={Inventario} />
                <Route exact path="/pedidos" component={Pedidos} />
            </Switch>
        </>
    )
}
