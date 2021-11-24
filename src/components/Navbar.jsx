import React from 'react'

const Navbar = () => {
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
                        <li><a href="/#" className="smoothscroll">Pedidos</a></li>
                        <li><a href="/#" className="smoothscroll">Inventario</a></li>
                        <li><a href="/#" className="smoothscroll">Cerrar sesión</a></li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
