import React, { Component } from 'react';
import CreateAseguradora from "./create-aseguradora.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const Aseguradora = props => (
  <Tr>
    <Td>{props.aseguradora.nit}</Td>
    <Td>{props.aseguradora.nombre}</Td>
    <Td>{props.aseguradora.telefono}</Td>
    <Td>{props.aseguradora.correo}</Td>
  </Tr>
)

export default class AseguradorasList extends Component {
  constructor() {
    super();

    this.state = {aseguradoras: []};
  }

    aseguradorasList() {
        return this.state.aseguradoras.map(currentAseguradora => {
            return <Aseguradora aseguradora={currentAseguradora} key={currentAseguradora._id}/>;
        })
    }

    componentDidMount(){
        this.fetchAseguradoras();
    }

    fetchAseguradoras() {
        fetch('/api/aseguradoras')
            .then(res => res.json())
            .then(data => {
                this.setState({aseguradoras: data});
            })
            .catch(err => console.error(err));
    }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"><h3>Aseguradoras</h3></div>
          <div className="col"> <CreateAseguradora component={this}/></div>
        </div>
        <Table className="table">
          <Thead className="thead-light">
            <Tr>
              <Th>nit</Th>
              <Th>nombre</Th>
              <Th>telefono</Th>
              <Th>correo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {this.aseguradorasList()}
          </Tbody>
        </Table>
      </div>
    )
  }
}