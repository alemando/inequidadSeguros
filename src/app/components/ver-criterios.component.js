import React, { Component } from 'react';
import VerCriterio from "./ver-criterio.component";
import AddCriterio from "./add-criterio.component";
import EliminarCriterio from "./eliminar-criterio.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const Criterio = props => (
  <Tr>
    <Td>{props.criterio.nombre}</Td>
    <Td><VerCriterio session={props.session} nombre={props.nombre} criterio={props.criterio} key={props.criterio.mombre} categoria={props.categoria} /></Td>
    <Td>
      <EliminarCriterio criterio={props.criterio.nombre} idCategoria={props.categoria._id}/>
    </Td>
  </Tr>
)

export default class VerCriterios extends Component {

  constructor(props) {
    super(props);

    this.state = {
      criterios: []
    }
  }

  componentDidMount() {
    this.setState({ criterios: this.props.categoria.criterios })
  }

  criteriosList() {
    return this.state.criterios.map(currentCriterio => {
      return <Criterio session={this.props.session} nombre={this.props.categoria.nombre} criterio={currentCriterio} key={currentCriterio.nombre} categoria={this.props.categoria} />;
    })
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Criterios-" + this.props.categoria.nombre.replace(/ /g, "_")}>Ver criterios</button>
        <div className="modal fade" id={"Criterios-" + this.props.categoria.nombre.replace(/ /g, "_")} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Criterios</b> {this.props.categoria.nombre}</h5>
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
                        <Th>Eliminar</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {this.criteriosList()}
                    </Tbody>
                  </Table>
                </div>
              </div>
              <div className="modal-footer">
              <AddCriterio idCategoria={this.props.categoria._id}/>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}