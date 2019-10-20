import React, { Component } from 'react';

import AseguradorasList from "./aseguradoras-list.component";
import AseguradoraCliente from "./create-aseguradora.component";

export default class Cliente extends Component {

  render() {
    return (
        <div>
            <AseguradorasList />
            <AseguradoraCliente />
        </div>
    );
  }
}