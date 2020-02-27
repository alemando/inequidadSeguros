import React, { Component } from 'react';
import VerCliente from "./ver-cliente.component";
import CreateCliente from "./create-cliente.component";
import VerBienes from "./ver-bienes.component";
import CreateBien from "./create-bien.component";
import EstadoCliente from "./estado-cliente.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable

const Cliente = props => (
  <Tr>
    <Td>{props.cliente.documento}</Td>
    <Td>{props.cliente.nombre}</Td>
    <Td>{props.cliente.apellido1} {props.cliente.apellido2}</Td>
    <Td><center><VerCliente cliente={props.cliente} key={props.cliente.documento}/></center></Td>
    <Td><center><VerBienes cliente={props.cliente._id} clienteInfo={props.cliente} key={props.cliente.documento}/></center></Td>
    <Td><center><CreateBien cliente={props.cliente._id} clienteInfo={props.cliente} key={props.cliente.documento}/></center></Td>
    <Td><center><EstadoCliente cliente={props.cliente.documento} estadoActual={props.cliente.estado}/></center></Td>
  </Tr>
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
        $("#tabla-clientes").DataTable({
          "autoWidth": false,
          "destroy":true,
          "responsive":true,
          "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se han encontrado registros",
            "info": "(_MAX_ clientes) Pagina _PAGE_ de _PAGES_",
            "search": "Buscar",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(registros disponibles _MAX_)"
          },
          "paginate":{
            "previous":"Anterior",
            "next":"Siguiente"
          }
        });
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
              <Table id="tabla-clientes" className="table table-bordered table-hover display">
                  <Thead>
                      <Tr>
                          <Th><center>Documento</center></Th>
                          <Th><center>Nombre</center></Th>
                          <Th><center>Apellidos</center></Th>
                          <Th><center>Ver más</center></Th>
                          <Th><center>Ver bienes</center></Th>
                          <Th><center>Crear bien</center></Th>
                          <Th><center>Estado</center></Th>
                      </Tr>
                  </Thead>                                        
                  <Tbody>
                      {this.clientesList()}
                  </Tbody>
              </Table>
              </div>
              
          </div>                                                      
      </div>
    </div>  
    )
  }
}