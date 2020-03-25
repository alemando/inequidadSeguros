
import MejoresClientes from './admin-mejores-clientes.component';
import React, { Component } from 'react';
import MejoresVendedores from './admin-mejores-vendedores.component';
import MejoresAseguradoras from './admin-mejores-aseguradoras.component';
import ClientesFieles from './clientes-fieles-vendedor.component';
import CantidadClientes from './cantidad-clientes.component';
import CantidadSeguros from './cantidad-seguros.component';
import SegurosPendientes from './seguros-pendientes.component';
import CategoriasComunes from './admin-categorias-comunes.component';
export default class Index extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            {this.props.session.esAdmin ? <SegurosPendientes session={this.props.session}></SegurosPendientes> : ""}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <CantidadClientes session={this.props.session}></CantidadClientes>
          </div>
          <div className="col-sm-12">
            <CantidadSeguros session={this.props.session}></CantidadSeguros>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.props.session.esAdmin ? <MejoresVendedores session={this.props.session}></MejoresVendedores> : ""}
          </div>
          <div className="col-sm-12">
            {this.props.session.esAdmin ? <MejoresAseguradoras session={this.props.session}></MejoresAseguradoras> : ""}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <ClientesFieles session={this.props.session}></ClientesFieles>
          </div>
          <div className="col-sm-12">
            {this.props.session.esAdmin ? <MejoresClientes session={this.props.session}></MejoresClientes> : ""}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.props.session.esAdmin ? <CategoriasComunes session={this.props.session}></CategoriasComunes> : ""}
          </div>
        </div>
      </div>
    );
  }
}
