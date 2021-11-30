import React, { useEffect, useState } from "react";
import ModalPedido from "./ModalPedido";
import axios from "axios";
import Swal from "sweetalert2";
import Tabla from "./Tabla";

const Pedidos = () => {
  const [dataPedidos, setDataPedidos] = useState(null);

  const baseGetPedidos = axios.create({
    baseURL:
      "https://sdib.com.mx/portafolio/sorcial/public/productos/mostrarProductos",
    timeout: 3000,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });

  /* const getPedidos = async () => {
    Swal.fire({
      title: "Cargando...",
      allowEscapeKey: false,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    try {
      const { data } = await baseGetPedidos.post();
      Swal.close();
      if (data.response_flag !== 1) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.trace,
        });
      } else {
        setDataPedidos(data);
        console.log(dataPedidos);
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
    getPedidos();
  }, []); */

  return (
    <div>
      <div className="card border-dark mb-3">
        <div className="card-body text-dark">
          <div className="card-title">
            <h5>Lista de pedidos</h5>
          </div>
          <Tabla />
          <ModalPedido />
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
