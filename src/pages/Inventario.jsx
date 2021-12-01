import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

const Inventario = () => {

    const [data, setData] = useState(null);

    const base = axios.create({
        baseURL:
        "https://sdib.com.mx/portafolio/sdm_backend/public/",
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
            setData(data);
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

    useEffect(() => {
        getProductos();
    }, []);

    return (
        <div className="table-responsive mt-2">
          <table className="table table-hover text-center" style={{'minWidth':'420px'}}>
            <thead className="table-dark">
              <tr>
                <th className="rounded-start" scope="col">Producto</th>
                <th scope="col">Empaque</th>
                <th scope="col">Existencia</th>
              </tr>
            </thead>
            {(data?.response_flag === 1) && <tbody>
              {
                data.response.map( (prod) => {
                  return prod.empaques.map( (emp) => {
                    return(
                        <tr key={prod.id+Date.now()}>
                          <td scope="row">{prod.descripcion+ ' | '+ emp.codigo_barras}</td>
                          <td>{emp.empaque_descripcion}</td>
                          <td>{emp.cantidad_empaque}</td>
                        </tr>)
                  })
                })
              }
            </tbody>}
          </table>
        </div>
      );
}

export default Inventario
