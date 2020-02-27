import React, { Component } from 'react';
import moment from 'moment'

export default class VerCliente extends Component {
  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Cliente" + this.props.cliente.documento}>Ver más</button>
        <div className="modal fade" id={"Cliente" + this.props.cliente.documento} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Cliente</b> {this.props.cliente.nombre + " " + this.props.cliente.apellido1 + " " + this.props.cliente.apellido2}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Documento</b></div>
                        <div className="col-md-6 ml-auto">{this.props.cliente.documento}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Nombre</b></div>
                        <div className="col-md-6 ml-auto">{this.props.cliente.nombre}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Apellidos</b></div>
                        <div className="col-md-6 ml-auto">{this.props.cliente.apellido1 + " " + this.props.cliente.apellido2}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Direccion</b></div>
                        <div className="col-md-6 ml-auto">{this.props.cliente.direccion}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Telefono</b></div>
                        <div className="col-md-6 ml-auto">{this.props.cliente.telefono}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Correo</b></div>
                        <div className="col-md-6 ml-auto">{this.props.cliente.correo}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Fecha nacimiento</b></div>
                        <div className="col-md-6 ml-auto">{moment(this.props.cliente.fechaNacimiento, "YYYY-MM-DD").locale("es").format("DD-MMM-YYYY")}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Ingresos</b></div>
                        <div className="col-md-6 ml-auto">{this.props.cliente.ingresos}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Egresos</b></div>
                        <div className="col-md-6 ml-auto">{this.props.cliente.egresos}</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}