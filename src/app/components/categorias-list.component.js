import React, { Component } from 'react';
import CreateCategoria from "./create-categoria.component";
import VerCriterios from "./ver-criterios.component";

const Categoria = props => (
  <tr>
    <td>{props.categoria.nombre}</td>
    <td><VerCriterios categoria={props.categoria}/></td>
  </tr>
)

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
        console.log(data)
        this.setState({ categorias: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"><h3>Categorias</h3></div>
          <div className="col"> <CreateCategoria component={this}/></div>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nombre</th>
              <th>Ver criterios</th>
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