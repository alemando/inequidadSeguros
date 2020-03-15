
import React, { Component } from 'react';
import MejoresClientes from './admin-mejores-clientes.component';
export default class Index extends Component {

  render() {
    return (
      <div className="row">
          <div className="col-sm-6">
            {this.props.session.esAdmin ? <MejoresClientes session={this.props.session}></MejoresClientes> : ""}
          </div>
      </div>
    );
  }
}