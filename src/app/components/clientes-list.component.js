import React, { Component } from 'react';
import VerCliente from "./ver-cliente.component";
import CreateCliente from "./create-cliente.component";
import VerBienes from "./ver-bienes.component";
import CreateBien from "./create-bien.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
const Cliente = props => (
  <Tr>
    <Td>{props.cliente.documento}</Td>
    <Td>{props.cliente.nombre}</Td>
    <Td>{props.cliente.apellido1} {props.cliente.apellido2}</Td>
    <Td><VerCliente cliente={props.cliente} key={props.cliente.documento}/></Td>
    <Td><VerBienes cliente={props.cliente._id} key={props.cliente.documento}/></Td>
    <Td><CreateBien cliente={props.cliente._id} key={props.cliente.documento}/></Td>
  </Tr>
)

export default class ClientesList extends Component {
  constructor() {
    super();
    this.state = { clientes: [] };
  }

  clientesList() {
    return this.state.clientes.map(currentCliente => {
      return <Cliente cliente={currentCliente} key={currentCliente._id} />;
    })
  }

  componentDidMount() {
    this.fetchClientes();
  }

  fetchClientes() {
    fetch('/api/clientes')
      .then(res => res.json())
      .then(data => {
        this.setState({ clientes: data });
      })
      .catch(err => console.error(err));
  }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"><h3>Clientes</h3></div>
          <div className="col"> <CreateCliente component={this}/></div>
        </div>
        <Table className="table" striped bordered hover size="sm" responsive="sm">
          <Thead className="thead-light">
            <Tr>
              <Th>Documento</Th>
              <Th>Nombre</Th>
              <Th>Apellidos</Th>
              <Th>Ver más</Th>
              <Th>Ver bienes</Th>
              <Th>Crear bien</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.clientesList()}
          </Tbody>
        </Table>
      </div>
    )
  }
}