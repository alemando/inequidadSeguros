import React, { Component } from 'react';

const Categoria = props => (
  <tr>
    <td>{props.categoria.nombre}</td>
    <td>+</td>
  </tr>
)
const Criterio = props => (
  <tr>
    <td>{props.categoria.criterio.nombre}</td>
    <td>+</td>
  </tr>
)
class Criterio extends Component {
  constructor() {
    super();

    this.state = {

      categoria: this.props.Categoria,
      show = false

    };
  }

  criteriosShow() {
    return <Criterio categoria={currentCategoria} key={currentCategoria._id} />;
  }

  render() {
    if (this.state.show) {
      return (
        <div>
          <h3>Criterio</h3>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>nombre</th>
                <th>descripcion</th>
                <th>monto a cubrir</th>
                <th>deducible</th>
                <th>observaciones</th>
              </tr>
            </thead>
            <tbody>
              {this.criteriosShow()}
            </tbody>
          </table>
        </div>
      )
    } else {
      return (
        <div>

        </div>
      )
    }
  }
}

export default class CategoriasList extends Component {
  constructor() {
    super();

    this.state = {

      categorias: []

    };
  }

  categoriasList() {
    return this.state.categorias.map(currentCategoria => {
      return <Categoria categoria={currentCategoria} key={currentCategoria._id} />;
    })
  }


  componentDidMount() {
    this.fetchCategorias();
  }

  fetchCategorias() {
    fetch('/api/categorias')
      .then(res => res.json())
      .then(data => {
        this.setState({ categorias: data });
      })
      .catch(err => console.error(err));
  }


  render() {
    return (
      <div>
        <h3>Categorias</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.categoriasList()}
          </tbody>
        </table>
      </div>
    )
  }
}