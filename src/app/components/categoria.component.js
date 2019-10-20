import React, { Component } from 'react';

import CategoriasList from "./categorias-list.component";
import CreateCategoria from "./create-categoria.component";

export default class Categoria extends Component {

  render() {
    return (
        <div>
            <CategoriasList />
            <CreateCategoria />
        </div>
    );
  }
}