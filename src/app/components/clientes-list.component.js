import React, { Component } from 'react';
import VerCliente from "./ver-cliente.component";
import CreateCliente from "./create-cliente.component";

const Cliente = props => (
  <tr>
    <td>{props.cliente.documento}</td>
    <td>{props.cliente.nombre}</td>
    <td>{props.cliente.apellido1} {props.cliente.apellido2}</td>
    <td><VerCliente  cliente={props.cliente} key={props.cliente.documento}/></td>
    
  </tr>
)
//<td><VerBienes documento={props.cliente.documento} key={props.cliente.documento} /></td>
/*
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
    this.VerBienes = this.VerBienes.bind(this);
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
}*/
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
      <div className="container">
        <div className="row">
          <div className="col"><h3>Clientes</h3></div>
          <div className="col"> <CreateCliente/></div>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Ver más</th>
              <th>Ver bienes</th>
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