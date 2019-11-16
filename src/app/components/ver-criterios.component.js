import React, { Component } from 'react';
import VerCriterio from "./ver-criterio.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const Criterio = props => (
  <Tr>
    <Td>{props.criterio.nombre}</Td>
    <Td><VerCriterio nombre={props.nombre} criterio={props.criterio} key={props.criterio.mombre}/></Td>
  </Tr>
)

export default class VerCriterios extends Component {
  
  constructor() {
    super();

    this.state = {
      criterios: []
    }
  }

  componentDidMount(){
    this.setState({criterios : this.props.categoria.criterios})
  }

  criteriosList() {
    return this.state.criterios.map(currentCriterio => {
      return <Criterio nombre={this.props.categoria.nombre} criterio={currentCriterio} key={currentCriterio.nombre} />;
    })
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Criterios-" + this.props.categoria.nombre}>ver criterios</button>
        <div className="modal fade" id={"Criterios-" +this.props.categoria.nombre} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Criterios</b></h5>
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
                        <Th>Ver más</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {this.criteriosList()}
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