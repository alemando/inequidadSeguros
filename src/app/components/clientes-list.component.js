import React, { Component } from 'react';
import VerCliente from "./ver-cliente.component";
import CreateCliente from "./create-cliente.component";
import VerBienes from "./ver-bienes.component";
import CreateBien from "./create-bien.component";

const Cliente = props => (
  <tr>
    <td>{props.cliente.documento}</td>
    <td>{props.cliente.nombre}</td>
    <td>{props.cliente.apellido1} {props.cliente.apellido2}</td>
    <td><VerCliente cliente={props.cliente} key={props.cliente.documento}/></td>
    <td><VerBienes cliente={props.cliente._id} key={props.cliente.documento}/></td>
    <td><CreateBien cliente={props.cliente._id} key={props.cliente.documento}/></td>
  </tr>
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
          <div className="col"><h3 align="left"><pre>Clientes</pre></h3></div>
          <div className="col"> <CreateCliente component={this}/></div>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Ver más</th>
              <th>Ver bienes</th>
              <th>Crear bien</th>
            </tr>
          </thead>
          <tbody>
            {this.clientesList()}
          </tbody>
        </table>
      </div>
    )
  }
}