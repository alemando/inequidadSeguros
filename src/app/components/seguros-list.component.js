import React, { Component } from 'react';
import CreateSeguro from "./create-seguro.component";
import VerSeguro from "./ver-seguro.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const Seguro = props => (
  <Tr>
    <Td>{props.seguro.cliente.nombre+" "+props.seguro.cliente.apellido1+" "+props.seguro.cliente.apellido2 }</Td>
    <Td>{props.seguro.bien.nombre}</Td>
    <Td>{props.seguro.aseguradora.nombre}</Td>
    <Td>{props.seguro.vendedor.nombre+" "+props.seguro.vendedor.apellido1+" "+props.seguro.vendedor.apellido2 }</Td>
    <Td><VerSeguro seguro={props.seguro} key={props.seguro._id}/></Td>
  </Tr>
)

export default class SegurosList extends Component {
  constructor() {
    super();

    this.state = {seguros: []};
  }

    segurosList() {
        return this.state.seguros.map(currentSeguro => {
            return <Seguro seguro={currentSeguro} key={currentSeguro._id}/>;
        })
    }


    componentDidMount(){
        this.fetchSeguros();
    }

    fetchSeguros() {
        fetch('/api/seguros')
            .then(res => res.json())
            .then(data => {
                this.setState({seguros: data});
            })
            .catch(err => console.error(err));
    }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"><h3 align="left"><pre>Seguros</pre></h3></div>
          <div className="col"> <CreateSeguro component={this}/></div>
        </div>
        <Table className="table">
          <Thead className="thead-light">
            <Tr>
              <Th>Cliente</Th>
              <Th>Bien</Th>
              <Th>Aseguradora</Th>
              <Th>Vendedor</Th>
              <Th>Ver mas</Th>
            </Tr>
          </Thead>
          <Tbody>
            { this.segurosList() }
          </Tbody>
        </Table>
      </div>
    )
  }
}
