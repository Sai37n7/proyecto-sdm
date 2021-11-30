import React, { useContext } from 'react'
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AuthTypes } from '../types/AuthTypes';
import Swal from 'sweetalert2'

const Navbar = () => {

    //Definimos el history usando useHistory()
    const history = useHistory();
    
    //Recuperamos el context y el dispatch para poderlo modificar.
    const { dispatch } = useContext(AuthContext);

    const handleLogout = () =>{
        Swal.fire({
            title: '¿Esta seguro que desea salir del sistema?',
            showCancelButton: true,
            confirmButtonText: 'Salir',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({type: AuthTypes.logout});
                localStorage.clear();
                history.replace("/login");
            }
        })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="/#"><b>SDM</b></a>
                    <button className="navbar-toggler m-0" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            <li className="nav-item"><NavLink className="nav-link" aria-current="page" to="pedidos">Pedidos</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" aria-current="page" to="inventario">Inventario</NavLink></li>
                            <li className="nav-item"><a onClick={handleLogout} style={{cursor : 'pointer'}} className="nav-link">Cerrar sesión</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
