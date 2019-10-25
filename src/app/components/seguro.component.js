import React, { Component } from 'react';

import SegurosList from "./categorias-list.component";
import CreateSeguros from "./create-categoria.component";

export default class Seguro extends Component {

  render() {
    return (
        <div>
            <SegurosList />
            <CreateSeguros />
        </div>
    );
  }
}
