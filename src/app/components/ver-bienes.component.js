import React, { Component } from 'react';
import VerBien from "./ver-bien.component";
import EliminarBien from "./eliminar-bien.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const TablaBien = props => (
  <Tr>
    <Td>{props.bien.nombre}</Td>
    <Td>{props.bien.categoria.nombre}</Td>
    <Td><center><VerBien bien={props.bien} key={props.bien._id}/></center></Td>
    <Td><center><EliminarBien bien={props.bien} key={props.bien._id}/></center></Td>
  </Tr>
)

export default class VerBienes extends Component {
  
  constructor() {
    super();

    this.state = {
      bienes: []
    }
    this.verBienes = this.verBienes.bind(this);

  }

  verBienes() {
    this.fetchBienes()
  }

  bienesList() {
    return this.state.bienes.map(currentBien => {
      return <TablaBien bien={currentBien} key={currentBien._id} />;
    })
  }

  fetchBienes() {
    fetch('/api/bienes/'+this.props.cliente, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ bienes: data });
      })
      .catch(err => console.error(err));
  }


  render() {
    return (
      <div>
        <button type="button" onClick={this.verBienes} className="btn btn-primary" data-toggle="modal" data-target={"#Bienes" + this.props.cliente}>Ver bienes</button>
        <div className="modal fade" id={"Bienes" +this.props.cliente} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Bienes</b> {this.props.clienteInfo.nombre + " " + this.props.clienteInfo.apellido1 + " " + this.props.clienteInfo.apellido2}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <Table className="table">
                    <Thead className="thead-light">
                      <Tr>
                        <Th>Nombre</Th>
                        <Th>Categoria</Th>
                        <Th>Ver mas</Th>
                        <Th>Eliminar</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {this.bienesList()}
                    </Tbody>
                  </Table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}