import React, { Component } from 'react';

export default class VerVendedor extends Component {
  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Vendedor" + this.props.vendedor.documento}>Ver más</button>
        <div className="modal fade" id={"Vendedor" + this.props.vendedor.documento} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Vendedor</b> {this.props.vendedor.nombre + " " + this.props.vendedor.apellido1 + " " + this.props.vendedor.apellido2}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <ul className="list-group">
                    <li class="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Documento</b></div>
                        <div className="col-md-6 ml-auto">{this.props.vendedor.documento}</div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Nombre</b></div>
                        <div className="col-md-6 ml-auto">{this.props.vendedor.nombre}</div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Apellidos</b></div>
                        <div className="col-md-6 ml-auto">{this.props.vendedor.apellido1 + " " + this.props.vendedor.apellido2}</div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Telefono</b></div>
                        <div className="col-md-6 ml-auto">{this.props.vendedor.telefono}</div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Correo</b></div>
                        <div className="col-md-6 ml-auto">{this.props.vendedor.correo}</div>
                      </div>
                    </li>
                  </ul>
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