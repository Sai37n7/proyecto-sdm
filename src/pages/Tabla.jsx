import React from "react";
import ModalPedido from "./ModalPedido";

const Tabla = (data) => {

  const color = (estatus) => {
    switch (estatus) {
      case 'SOLICITADO':
        return 'bg-primary';
      case 'REVISADO':
        return 'bg-info';
      case 'APROBADO':
        return 'bg-success';
      case 'CANCELADO':
        return 'bg-danger';
      case 'SURTIDO':
        return 'bg-info';
      case 'SURTIDO PARCIAL':
        return 'bg-warning';
      default:
        break;
    }
  }

  return (
    <div className="table-responsive mt-2">
      <table className="table table-hover text-center" style={{'minWidth':'420px'}}>
        <thead className="table-dark">
          <tr>
            <th className="rounded-start" scope="col">Folio</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estatus</th>
            <th className="rounded-end" scope="col">Acciones</th>
          </tr>
        </thead>
        {(data?.response_flag === 1) && <tbody>
          {
            data.response.map( (p) => {
              return(
              <tr key={p.id+Date.now()}>
                <td scope="row">{p.folio}</td>
                <td>{p.fechaCreacion.split('.')[0]}</td>
                <td><span className={"rounded-3 text-white px-2 "+color(p.estatus)}>{p.estatus}</span></td>
                <td>
                <ModalPedido {...p} />
                </td>
              </tr>)
            })
          }
        </tbody>}
      </table>
    </div>
  );
};

export default Tabla;
