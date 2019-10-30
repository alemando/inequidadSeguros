import React, { Component } from 'react';
import Modal from 'react-modal';
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
    <td><VerBienes documento={props.cliente.documento} key={props.cliente.documento} /></td>
  </tr>
)
const MostrarBien = props => (
  <tr>
    <td>{props.bien.id}</td>
    <td>{props.bien.nombre_de_referencia}</td>
    <td>{props.bien.caracteristicas}</td>
    <button className="btn btn-primary">descarga</button>
  </tr>
)

class VerBienes extends Component {
  constructor() {
    super();

    this.state = {
      bienes: [],
      showModal: false
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.VerBienes = this.VerBienes.bind(this);
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  VerBienes() {
    this.fetchBienes()
    this.handleOpenModal()
  }
  bienesList() {
    return this.state.bienes.map(currentBien => {
      return <MostrarBien bien={currentBien} key={currentBien._id} />;
    })
  }
  fetchBienes() {
    fetch('/api/bien/getByidCliente', {
      method: 'POST',
      body: JSON.stringify({ documento: this.props.documento }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        alert(data)
        this.setState({ bienes: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
      <button onClick={this.VerBienes} className="btn btn-primary"> ver bienes</button>

      <Modal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
          <div>
            <button onClick={this.handleCloseModal} className="btn btn-danger float-right">Cerrar</button>
            <div>
              <h3>Bienes del cliente: {this.props.documento}</h3>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th>id</th>
                    <th>Nombre de referencia</th>
                    <th>Caracteristicas</th>
                    <th>Documento</th>
                  </tr>
                </thead>
                <tbody>
                  {this.bienesList()}
                </tbody>
              </table>
            </div>
          </div>
        </Modal>


      </div>
    )
  }
}
//--------------------------------------------------------------------------------------------------------------
//|
//|
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
            {this.clientesList()}
          </tbody>
        </table>
      </div>
    )
  }
}