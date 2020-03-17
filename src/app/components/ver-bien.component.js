import React, { Component } from 'react';
import $ from 'jquery';
export default class VerBien extends Component {

  constructor(props) {
    super(props);
    this.modalClose = this.modalClose.bind(this);
  }

  modalClose() {
    $('#Bien-' + this.props.bien._id).modal('hide');
    $(document).on('hidden.bs.modal', '.modal', function () {
      if ($('body').find('.modal.show').length > 0) {
        $('body').addClass('modal-open');
      }
    });
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={'#Bien-' + this.props.bien._id}>Ver más</button>
        <div className="modal fade" id={'Bien-' + this.props.bien._id} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Bien</b></h5>
                <button type="button" className="close" onClick={this.modalClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Nombre</b></div>
                        <div className="col-md-6 ml-auto">{this.props.bien.nombre}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Cliente</b></div>
                        <div className="col-md-6 ml-auto">
                          {this.props.bien.cliente.nombre + ' ' + this.props.bien.cliente.apellido1 +
                            ' ' + this.props.bien.cliente.apellido2}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Categoria</b></div>
                        <div className="col-md-6 ml-auto">{this.props.bien.categoria.nombre}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Caracteristicas</b></div>
                        <div className="col-md-6 ml-auto">{this.props.bien.caracteristicas}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Documento</b></div>
                        <div className="col-md-6 ml-auto"><a target="_blank" rel="noopener noreferrer"
                          className="btn btn-primary" href={"/api/bienes/documento/" + this.props.bien._id}>Ver documento
                    </a></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.modalClose}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}