import React, { Component } from 'react';
import MejoresVendedores from './admin-mejores-vendedores.component';
import MejoresAseguradoras from './admin-mejores-aseguradoras.component';
import CantidadClientes from './cantidad-clientes.component'
export default class Index extends Component {

  render() {
    return (
      <div className="row">
          <div className="col-sm-6">
            {this.props.session.esAdmin ? <MejoresVendedores session={this.props.session}></MejoresVendedores> : ""}
          </div>
          <div className="col-sm-6">
            {this.props.session.esAdmin ? <MejoresAseguradoras session={this.props.session}></MejoresAseguradoras> : ""}
          </div>
          <div className="col-sm-6">
            <CantidadClientes session={this.props.session}></CantidadClientes>
            </div>
      </div>
    );
  }
}