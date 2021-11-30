import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Tabla from "./Tabla";
import ModalAgregarPedido from "./ModalAgregarPedido";

const Pedidos = () => {
  const [data, setData] = useState(null);

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

  const getPedidos = async () => {
    mostrarLoading();
    try {
      const { data } = await base.post('/api/pedidos/mostrarPedidos');
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
    getPedidos();
  }, []);

  return (
    <div>
      <div className="card border-dark mb-3">
        <div className="card-body text-dark">
          <div className="card-title">
            <div className="row">
              <div className="col">
                <h5>Lista de pedidos</h5>
              </div>
              <div className="col">
                <ModalAgregarPedido />  
              </div>
            </div>
          </div>
          <Tabla {...data}/>
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
