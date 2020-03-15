
import React, { Component } from 'react';
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
    <Td>{props.cliente.topClientes.numero_seguros}</Td>
    
  </Tr>
)

export default class MejoresClientes extends Component {
  constructor(props) {
    super(props);
    this.state = { clientes: [] };
  }

  topClientes() {
    return this.state.clientes.topClientes.map(currentCliente => {
      return <Cliente session={this.props.session} cliente={currentCliente} key={currentCliente._id} component={this}/>;
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
            "infoFiltered": "(registros disponibles _MAX_)",
            "paginate":{
              "previous":"Anterior",
              "next":"Siguiente"
            }
          },
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
                      <h3><i className="fa fa-users"></i> Top 5 mejores clientes</h3>
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
                          <Th><center>Numero de seguros</center></Th>
                      </Tr>
                  </Thead>                                        
                  <Tbody>
                      {this.topClientes()}
                  </Tbody>
              </Table>
              </div>
              
          </div>                                                      
      </div>
    </div>  
    )
  }
}
