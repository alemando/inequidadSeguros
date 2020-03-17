import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const Bien = props => (
  <Tr>
    <Td>{props.bien.id}</Td>
    <Td>{props.bien.documentoCliente}</Td>
    <Td>{props.bien.categoria}</Td>
    <Td>{props.bien.caracteristicas}</Td>
    <Td>{props.bien.documentos}</Td>
  </Tr>
)

export default class BienesList extends Component {
  constructor() {
    super();

    this.state = { bienes: [] };
  }

  bienesList() {
    return this.state.bienes.map(currentBien => {
      return <Bien Bien={currentBien} key={currentBien._id} />;
    })
  }

  componentDidMount() {
    this.fetchBienes();
  }

  fetchBienes() {
    fetch('/api/bienes')
      .then(res => res.json())
      .then(data => {
        this.setState({ bienes: data });
      })
      .catch(err => console.error(err));
  }


  render() {
    return (
      <div>
        <h3>Bienes</h3>
        <Table className="table">
          <Thead className="thead-light">
            <Tr>
              <Th>id</Th>
              <Th>documentoCliente</Th>
              <Th>categoria</Th>
              <Th>caracteristicas</Th>
              <Th>documentos</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.bienesList()}
          </Tbody>
        </Table>
      </div>
    )
  }
}