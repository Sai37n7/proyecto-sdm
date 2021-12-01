import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

const ModalAgregarPedido = ({history}) => {
    const [productos, setProductos] = useState([]);
    const [solicitados, setSolicitados] = useState([])
    const [producto, setProducto] = useState({});
    const [cantidad, setCantidad] = useState(1);
    const [select, setSelect] = useState(0);
    const [observaciones, setObservaciones] = useState("");

    history = useHistory();

    const handleChange = (e) => {
        setSelect(e.target.value);
    }

    const handleChangeObservaciones = (e) => {
        setObservaciones(e.target.value);
    }

    const handleChangeCantidad = (e) => {
        setCantidad(Number(e.target.value));
    }

    const simulateClick = elem => {
        let evt = new MouseEvent('click', {
            bubbles: true,
            view: window
        });
        elem.dispatchEvent(evt);
    };
    
    const agregarProducto = () => {
        let sel = document.getElementById("productos_pedido");
        let text= sel.options[sel.selectedIndex].text;
        let value = Number(sel.options[sel.selectedIndex].value);
        if(value !== 0){
            let existe = false;
            solicitados.forEach( d => {
                if(d.producto_empaque_id === value){
                    existe = true;
                }
            })
            if(!existe){
                //console.log(text, value);
                setProducto({
                    nombre: text,
                    id: value
                });
                //console.log(producto); 
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'El producto ya esta seleccionado',
                });
            }
        }else{
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Por favor, seleccione un producto valido.',
            });
        }
    }

    useEffect( () => {
        setSolicitados([...solicitados, {
            producto_empaque_id: producto.id,
            nombre: producto.nombre,
            cantidad
        }])
        console.log(solicitados);
    }, [producto])

    const base = axios.create({
        baseURL:
          "http://127.0.0.1:8000",
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

    const guardar = async () => {
        if(solicitados.length <= 1){
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'No existen productos a solicitar',
            });
            return;
        }
        mostrarLoading();
        try {
            let body = new Object();
            body.producto_empaque = [];
            solicitados.forEach((d,i) => {
                if(i !== 0){
                    body.producto_empaque.push({
                        producto_empaque_id: d.producto_empaque_id,
                        cantidad: d.cantidad
                    });
                }
            })
            body.observaciones = observaciones;
            console.log(body);
            const { data } = await base.post('/api/pedidos/crearPedido', body);
            Swal.close();
            if (data.response_flag !== 1) {
                Swal.fire({
                icon: "error",
                title: "Error",
                text: data.trace,
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Pedido creado con exito",
                    timer: 1500,
                    showConfirmButton: false,
                    willClose: () => {
                        let drawControl = document.getElementById('cerrarModal');
                        simulateClick(drawControl);
                        history.push("/pedidos");
                    }
                });
            }
        } catch (error) {
            Swal.close();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error, intente más tarde.",
            });
        }
    }

    const getProductos = async () => {
        setCantidad(1);
        setSolicitados([]);
        setObservaciones("");
        setProducto({});
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

    const eliminarProducto = (id) => {
        let copy = solicitados.filter( (d) => (d.producto_empaque_id !== id));
        setSolicitados(copy);
    }

    return (
    <div>
        <button type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#modalAgregarPedido1" onClick={()=>getProductos()}>
        <i class="fas fa-plus-circle"></i>  Agregar pedido</button>
        {/* Modal */}
        <div className="modal fade" id="modalAgregarPedido1" tabIndex="-1" aria-labelledby="modalAgregarPedido1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Nuevo pedido</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="cerrarModal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row text-start">
                            <div className="mb-3">
                                <label className="form-label" for="productos_pedido">Producto:</label>
                                <select className="form-select" aria-label="Default select example" id="productos_pedido" onChange={handleChange} defaultValue={select} value={select}>
                                    <option value={0}>Seleccione una opcion</option>
                                    {
                                        productos.map( (p) => {
                                            return(<option key={p.id+Date.now()} value={Number(p.id)} selected>{p.descripcion}</option>);
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
                                            <th scope="col">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            solicitados.map( (p, i) => {
                                                if(i !== 0){
                                                    return (
                                                        <tr key={p.producto_empaque_id+Date.now()}>
                                                            <td scope="row">{p.nombre}</td>
                                                            {/* <td>{p.empaque}</td> */}
                                                            <td>{p.cantidad}</td>
                                                            <td><button type="button" class="btn btn-danger" onClick={()=>eliminarProducto(p.producto_empaque_id)}><i class="fas fa-trash"></i></button></td>
                                                        </tr>)
                                                }
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Observaciones:</label>
                                <textarea style={{resize: 'none'}} className="form-control" rows="3" onChange={handleChangeObservaciones} value={observaciones}></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" className="btn btn-primary" onClick={()=>guardar()}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ModalAgregarPedido
