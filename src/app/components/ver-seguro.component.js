import React, { Component } from 'react';
import VerCriterio from "./ver-criterio-seguro.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const Criterio = props => (
  <Tr>
    <Td>{props.criterio.nombre}</Td>
    <Td><center><VerCriterio criterio={props.criterio} key={props.criterio._id} /></center></Td>
  </Tr>
)

export default class VerSeguro extends Component {

  constructor() {
    super();

    this.state = {
      criterios: []
    }
  }

  componentDidMount() {
    this.setState({ criterios: this.props.seguro.criterios })
  }

  criteriosList() {
    return this.state.criterios.map(currentCriterio => {
      return <Criterio criterio={currentCriterio} key={currentCriterio._id} />;
    })
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Seguro" + this.props.seguro._id}>ver más</button>
        <div className="modal fade" id={"Seguro" + this.props.seguro._id} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Seguro</b> {this.props.seguro.bien.nombre + " de " + this.props.seguro.cliente.nombre + " " + this.props.seguro.cliente.apellido1 + " " + this.props.seguro.cliente.apellido2}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Vendedor</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.vendedor.nombre +
                          " " + this.props.seguro.vendedor.apellido1 + " " + this.props.seguro.vendedor.apellido2}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Aseguradora</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.aseguradora.nombre}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Cliente</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.cliente.nombre +
                          " " + this.props.seguro.cliente.apellido1 + " " + this.props.seguro.cliente.apellido2}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Bien</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.bien.nombre}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Fecha Inicio</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.fechaInicio}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Fecha Fin</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.fechaFin}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Dia pago</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.diaPago}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Valor total</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.valorTotal}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Estado</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.estado}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Observaciones</b></div>
                        <div className="col-md-6 ml-auto">{this.props.seguro.observaciones}</div>
                      </div>
                    </li>
                  </ul>
                  <div className="row">
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