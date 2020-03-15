
import React, { Component } from 'react';
import MejoresClientes from './admin-mejores-clientes.component';
export default class Index extends Component {

  render() {
    return (
      <div>
<<<<<<< HEAD
      <div className="row">
          <div className="col-sm-6">
            {this.props.session.esAdmin ? <MejoresClientes session={this.props.session}></MejoresClientes> : ""}
          </div>
      </div>
      <div>
        hola
      </div>
=======
        hola
>>>>>>> 2861d7ddd06d0700e1f87a4b033f32365197b923
      </div>
    );
  }
}