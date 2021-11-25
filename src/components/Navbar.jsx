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
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="/#"><b>SDM</b></a>
                    <button className="navbar-toggler m-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item"><NavLink className="nav-link" aria-current="page" to="pedidos">Pedidos</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" aria-current="page" to="inventario">Inventario</NavLink></li>
                            <li className="nav-item"><a href="/#"  onClick={handleLogout} className="nav-link">Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
