import React, { Component } from 'react';
import CreateCategoria from "./create-categoria.component";
import VerCriterios from "./ver-criterios.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const Categoria = props => (
  <Tr>
    <Td>{props.categoria.nombre}</Td>
    <Td><VerCriterios categoria={props.categoria}/></Td>
  </Tr>
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
        this.setState({ categorias: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"><h3 align="left"><pre>Categorías</pre></h3></div>
          <div className="col"> <CreateCategoria component={this}/></div>
        </div>
        <Table className="table">
          <Thead className="thead-light">
            <Tr>
              <Th>Nombre</Th>
              <Th>Ver criterios</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.categoriasList()}
          </Tbody>
        </Table>
      </div>
    )
  }
}