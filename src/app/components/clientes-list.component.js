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
    <td><center><VerCliente cliente={props.cliente} key={props.cliente.documento}/></center></td>
    <td><center><VerBienes cliente={props.cliente._id} key={props.cliente.documento}/></center></td>
    <td><center><CreateBien cliente={props.cliente._id} key={props.cliente.documento}/></center></td>
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
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
      <div className="card mb-3">
          <div className="card-header">
              <div className="row">
                  <div className="col-xs-6 col-sm-6 col-md-8 col-lg-10 col-xl-10">
                      <h3><i className="fa fa-users"></i> Clientes disponibles</h3>
                  </div>
                  <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 col-xl-2">
                      <CreateCliente component={this}/>
                  </div>
              </div>
          </div>
              
          <div className="card-body">
              <div className="table-responsive">
              <table id="tabla-vendedores" className="table table-bordered table-hover display">
                  <thead>
                      <tr>
                          <th><center>Documento</center></th>
                          <th><center>Nombre</center></th>
                          <th><center>Apellidos</center></th>
                          <th><center>Ver más</center></th>
                          <th><center>Ver bienes</center></th>
                          <th><center>Crear bien</center></th>
                      </tr>
                  </thead>                                        
                  <tbody>
                      {this.clientesList()}
                  </tbody>
              </table>
              </div>
              
          </div>                                                      
      </div>
    </div>  
    )
  }
}