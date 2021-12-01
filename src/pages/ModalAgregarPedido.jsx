import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const ModalAgregarPedido = () => {
    const [productos, setProductos] = useState([]);
    const [solicitados, setSolicitados] = useState([])
    const [producto, setProducto] = useState({});
    const [cantidad, setCantidad] = useState(1);
    const [select, setSelect] = useState(0);

    const handleChange = (e) => {
        setSelect(e.target.value);
    }

    const handleChangeCantidad = (e) => {
        setCantidad(Number(e.target.value));
    }
    
    const agregarProducto = () => {
        let sel = document.getElementById("productos_pedido");
        let text= sel.options[sel.selectedIndex].text;
        let value = sel.options[sel.selectedIndex].value;
        //console.log(text, value);
        setProducto({
            nombre: text,
            id: value
        });
        //console.log(producto);
    }

    useEffect( () => {
        setSolicitados([...solicitados, {
            producto_empaque: producto.id,
            nombre: producto.nombre,
            cantidad
        }])
        console.log(solicitados);
    }, [producto])

    // useEffect( () => {
    //     if(!solicitados[0]){
    //         setSolicitados([]);
    //     }
    // },[solicitados])

    const base = axios.create({
        baseURL:
          "http://127.0.0.1:8000",
        timeout: 5000,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });

    const mostrarLoading = () => {
        Swal.fire({
          title: "Cargando...",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
    }

    const getProductos = async () => {
        mostrarLoading();
        try {
            const { data } = await base.post('/api/productos/mostrarProductos');
            Swal.close();
            if (data.response_flag !== 1) {
                Swal.fire({
                icon: "error",
                title: "Error",
                text: data.trace,
                });
            } else {
                setProductos(data.response);
                setSelect(data.response[0].id)
                console.log(data);
            }
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error, intente más tarde.",
            });
        }
    };

    return (
    <div>
        <button type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modalAgregarPedido1" onClick={()=>getProductos()}>Agregar pedido</button>
        {/* Modal */}
        <div className="modal fade" id="modalAgregarPedido1" tabIndex="-1" aria-labelledby="modalAgregarPedido1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nuevo pedido</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row text-start">
                            <div className="mb-3">
                                <label className="form-label" for="productos_pedido">Producto:</label>
                                <select className="form-select" aria-label="Default select example" id="productos_pedido" onChange={handleChange} value={select}>
                                    <option value="0">Seleccione una opcion</option>
                                    {
                                        productos.map( (p) => {
                                            return(<option key={p.id} value={p.id} selected>{p.descripcion}</option>);
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Cantidad:</label>
                                <input type="number" min="1" className="form-control" aria-label="Sizing example input" value={cantidad} onChange={handleChangeCantidad} onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}/>
                            </div>
                            <div className="mb-3">
                                <button type="button" class="btn btn-primary" onClick={agregarProducto}>Añadir</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="table-responsive-sm mt-2">
                                <table className="table table-hover">
                                    <thead className="table-dark">
                                        <tr>
                                            <th className="rounded-start" scope="col">Producto</th>
                                            <th scope="col">Cant. Pedida</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            solicitados.map( (p, i) => {
                                                if(i !== 0){
                                                    return(
                                                        <tr key={p.producto_empaque+'p'}>
                                                            <td scope="row">{p.nombre}</td>
                                                            {/* <td>{p.empaque}</td> */}
                                                            <td>{p.cantidad}</td>
                                                        </tr>)
                                                }
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ModalAgregarPedido
