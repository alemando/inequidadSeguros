import React, { Component } from 'react';

const Cliente = props => (
  <tr>
    <td>{props.cliente.documento}</td>
    <td>{props.cliente.nombre}</td>
    <td>{props.cliente.apellido1}</td>
    <td>{props.cliente.apellido2}</td>
    <td>{props.cliente.direccion}</td>
    <td>{props.cliente.telefono}</td>
    <td>{props.cliente.correo}</td>
    <td>{props.cliente.fechaNacimiento}</td>
    <td>{props.cliente.ingresos}</td>
    <td>{props.cliente.egresos}</td>
  </tr>
)

export default class ClientesList extends Component {
  constructor() {
    super();

    this.state = {clientes: []};
  }

    clientesList() {
        return this.state.clientes.map(currentCliente => {
            return <Cliente cliente={currentCliente} key={currentCliente._id}/>;
        })
    }

  
    componentDidMount(){
        this.fetchClientes();
    }

    fetchClientes() {
        fetch('/api/clientes')
            .then(res => res.json())
            .then(data => {
                this.setState({clientes: data});
            })
            .catch(err => console.error(err));
    }


  render() {
    return (
      <div>
        <h3>Clientes</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>documentos</th>
              <th>nombre</th>
              <th>apellido1</th>
              <th>apellido2</th>
              <th>direccion</th>
              <th>telefono</th>
              <th>correo</th>
              <th>fechaNacimiento</th>
              <th>ingresos</th>
              <th>egresos</th>
            </tr>
          </thead>
          <tbody>
            { this.clientesList() }
          </tbody>
        </table>
      </div>
    )
  }
}