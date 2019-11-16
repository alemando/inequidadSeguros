import React, { Component } from 'react';
import VerVendedor from "./ver-vendedor.component";
import CreateVendedor from "./create-vendedor.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const Vendedor = props => (
  <Tr>
    <Td>{props.vendedor.documento}</Td>
    <Td>{props.vendedor.nombre}</Td>
    <Td>{props.vendedor.apellido1} {props.vendedor.apellido2}</Td>
    <Td><VerVendedor vendedor={props.vendedor} key={props.vendedor.documento}/></Td>
  </Tr>
)

export default class VendedoresList extends Component {
  constructor() {
    super();
    this.state = { vendedores: [] };
  }

    vendedoresList() {
    return this.state.vendedores.map(currentVendedor => {
      return <Vendedor vendedor={currentVendedor} key={currentVendedor._id} />;
    })
  }

  componentDidMount() {
    this.fetchVendedores();
  }

  fetchVendedores() {
    fetch('/api/vendedores')
      .then(res => res.json())
      .then(data => {
        this.setState({ vendedores: data });
      })
      .catch(err => console.error(err));
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"><h3>Vendedores</h3></div>
          <div className="col"> <CreateVendedor component={this}/></div>
        </div>
        <Table className="table">
          <Thead className="thead-light">
            <Tr>
              <Th>Documento</Th>
              <Th>Nombre</Th>
              <Th>Apellidos</Th>
              <Th>Ver más</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.vendedoresList()}
          </Tbody>
        </Table>
      </div>
    )
  }
}