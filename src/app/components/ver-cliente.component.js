import React, { Component } from 'react';

export default class VerCliente extends Component {
  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Cliente" + this.props.cliente.documento}>ver más</button>
        <div className="modal fade" id={"Cliente" +this.props.cliente.documento} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Cliente</b></h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Documento</b></div>
                    <div className="col-md-6 ml-auto">{this.props.cliente.documento}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Nombre</b></div>
                    <div className="col-md-6 ml-auto">{this.props.cliente.nombre}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Apellidos</b></div>
                    <div className="col-md-6 ml-auto">{this.props.cliente.apellido1 + " " + this.props.cliente.apellido2}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Direccion</b></div>
                    <div className="col-md-6 ml-auto">{this.props.cliente.direccion}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Telefono</b></div>
                    <div className="col-md-6 ml-auto">{this.props.cliente.telefono}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Correo</b></div>
                    <div className="col-md-6 ml-auto">{this.props.cliente.correo}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Fecha nacimiento</b></div>
                    <div className="col-md-6 ml-auto">{this.props.cliente.fechaNacimiento}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Ingresos</b></div>
                    <div className="col-md-6 ml-auto">{this.props.cliente.ingresos}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Ingresos</b></div>
                    <div className="col-md-6 ml-auto">{this.props.cliente.egresos}</div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}