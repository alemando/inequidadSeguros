import React, { Component } from 'react';

import ClientesList from "./clientes-list.component";
import CreateCliente from "./create-cliente.component";

export default class Cliente extends Component {

  render() {
    return (
        <div>
            <ClientesList />
            <CreateCliente />
        </div>
    );
  }
}