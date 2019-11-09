import React, { Component } from 'react';
import $ from 'jquery';
export default class VerCriterio extends Component {

  constructor(props){
    super(props);
    this.modalClose = this.modalClose.bind(this);
}

  modalClose(){
    $('#Criterio-'+ this.categoriaCriterio() +this.props.criterio.nombre).modal('hide');
}

  categoriaCriterio(){
    if(this.props.nombre){
      return this.props.nombre + "-"
    }
    return ""
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Criterio-" + this.categoriaCriterio() + this.props.criterio.nombre}>ver más</button>
        <div className="modal fade" id={"Criterio-" + this.categoriaCriterio() +this.props.criterio.nombre} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Cliente</b></h5>
                <button type="button" className="close" onClick={this.modalClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Nombre</b></div>
                    <div className="col-md-6 ml-auto">{this.props.criterio.nombre}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Descripcion</b></div>
                    <div className="col-md-6 ml-auto">{this.props.criterio.descripcion }</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Monto a cubrir</b></div>
                    <div className="col-md-6 ml-auto">{this.props.criterio.montoCubrir}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 ml-auto"><b>Deducible</b></div>
                    <div className="col-md-6 ml-auto">{this.props.criterio.deducible}</div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={this.modalClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}