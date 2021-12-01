import React from "react";

const ModalPedido = ({id, folio, fechaCreacion, estatus, observaciones, detalle}) => {
  return (
    <div>
      {/* Button trigger modal */}
      <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={"#exampleModal"+id}>
      <i class="fas fa-eye"></i> Ver detalle
      </button>

      {/* Modal */}
      <div className="modal fade" id={"exampleModal"+id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Detalle de pedido</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row text-start">
                <div className="mb-3">
                  <label className="form-label">Folio:</label>
                  <input disabled type="text" className="form-control" aria-label="Sizing example input" value={folio}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha:</label>
                  <input disabled type="text" className="form-control" aria-label="Sizing example input" value={fechaCreacion.split('.')[0]}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Estatus:</label>
                  <input disabled type="text" className="form-control" aria-label="Sizing example input" value={estatus}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Observaciones:</label>
                  <textarea disabled style={{resize: 'none'}} className="form-control" id="exampleFormControlTextarea1" rows="3" value={observaciones}></textarea>
                </div>
              </div>
              <div className="row">
                <div className="table-responsive-sm mt-2">
                  <table className="table table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th className="rounded-start" scope="col">Producto</th>
                        {/* <th scope="col">Empaque</th> */}
                        <th scope="col">Cant. Pedida</th>
                        <th scope="col">Cant. Surtida</th>
                        <th scope="col">Cant. Entregada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        detalle.map( (p) => {
                          return(
                          <tr key={p.id}>
                            <td scope="row">{p.producto}</td>
                            {/* <td>{p.empaque}</td> */}
                            <td>{p.cantidad}</td>
                            <td>{p.cantidadSurtida}</td>
                            <td>{p.cantidadRecepcionada}</td>
                          </tr>)
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              {/* <button type="button" className="btn btn-primary">Guardar</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPedido;
