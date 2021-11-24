import React, { useContext } from 'react'
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AuthTypes } from '../types/AuthTypes';

const Navbar = () => {

    //Definimos el history usando useHistory()
    const history = useHistory();
    
    //Recuperamos el context y el dispatch para poderlo modificar.
    const { dispatch } = useContext(AuthContext);

    const handleLogout = () =>{
        //Usamos el dispathc para modificar el context y establecerlo en false.
        dispatch({type: AuthTypes.logout});
        localStorage.clear();

        //console.log(history);
        history.replace("/login");
    }

    return (
        <div>
            <div className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/#"><b>SDM</b></a>
                </div>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><NavLink className="smoothscroll" aria-current="page" to="pedidos">Pedidos</NavLink></li>
                        <li><NavLink className="smoothscroll" aria-current="page" to="inventario">Inventario</NavLink></li>
                        <li><a href="/#"  onClick={handleLogout} className="smoothscroll">Cerrar sesión</a></li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
