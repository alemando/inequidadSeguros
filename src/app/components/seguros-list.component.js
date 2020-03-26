import React, { Component } from 'react';
import CreateSeguro from "./create-seguro.component";
import VerSeguro from "./ver-seguro.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable


const Seguro = props => (
  <Tr>
    <Td>{props.seguro.cliente.nombre + " " + props.seguro.cliente.apellido1 + " " + props.seguro.cliente.apellido2}</Td>
    <Td>{props.seguro.bien.nombre}</Td>
    <Td>{props.seguro.aseguradora.nombre}</Td>
    <Td>{props.seguro.vendedor.nombre + " " + props.seguro.vendedor.apellido1 + " " + props.seguro.vendedor.apellido2}</Td>
    <Td>{props.seguro.estado}</Td>
    <Td><center><VerSeguro session={props.session} seguro={props.seguro} key={props.seguro._id} /></center></Td>
  </Tr>
)

export default class SegurosList extends Component {
  constructor(props) {
    super(props);

    this.state = { seguros: [] };
  }

  segurosList() {
    if (this.state.seguros.length > 0) {
      return this.state.seguros.map(currentSeguro => {
        return <Seguro session={this.props.session} seguro={currentSeguro} key={currentSeguro._id} />;
      })
    } else {
      return (
        <Tr>
          <Td colSpan="4">
            <div className="alert alert-warning" role="alert">
              No hay seguros
        </div>
          </Td>
        </Tr>)
      
    }
  }


  componentDidMount() {
    this.fetchSeguros();
  }

  fetchSeguros() {
    fetch('/api/seguros')
      .then(res => res.json())
      .then(data => {
        this.setState({ seguros: data });
        $("#tabla-seguros").DataTable({
          "autoWidth": false,
          "destroy": true,
          "responsive": true,
          "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se han encontrado registros",
            "info": "(_MAX_ seguros) Pagina _PAGE_ de _PAGES_",
            "search": "Buscar",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(registros disponibles _MAX_)",
            "paginate": {
              "previous": "Anterior",
              "next": "Siguiente"
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
                <h3><i className="fa fa-shield"></i> Seguros disponibles</h3>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 col-xl-2">
                <CreateSeguro session={this.props.session} component={this} />
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <Table id="tabla-seguros" className="table table-bordered table-hover display">
                <Thead>
                  <Tr>
                    <Th><center>Cliente</center></Th>
                    <Th><center>Bien</center></Th>
                    <Th><center>Aseguradora</center></Th>
                    <Th><center>Vendedor</center></Th>
                    <Th><center>Estado</center></Th>
                    <Th><center>Ver mas</center></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {this.segurosList()}
                </Tbody>
              </Table>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
