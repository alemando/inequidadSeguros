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
    <td><ViewCliente documento={props.cliente.documento} key={props.cliente.documento}/></td>
  </tr>
)

class ViewCliente extends Component {
  constructor() {
    super();

    this.state = {
      documento: '',
      nombre: '',
      apellido1: '',
      apellido2: '',
      direccion: '',
      telefono: '',
      correo: '',
      fechaNacimiento: '',
      ingresos: 0,
      egresos: 0
  }
    this.viewCliente = this.viewCliente.bind(this);
  }

    viewCliente() {
        this.fetchClientes()
    }

    fetchClientes() {
        fetch('/api/clientes/getByDocumento', {
          method: 'POST',
          body: JSON.stringify({documento: this.props.documento}),
          headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
          }
      })
        .then(res => res.json())
        .then(data => {
          alert(data)
            this.setState({clientes: data});
        })
        .catch(err => console.error(err));
    }

  render() {
    return (
      <button onClick={this.viewCliente} className="btn btn-primary"> ver cliente</button>
    )
  }
}

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