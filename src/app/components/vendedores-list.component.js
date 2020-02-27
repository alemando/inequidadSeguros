import React, { Component } from 'react';
import VerVendedor from "./ver-vendedor.component";
import CreateVendedor from "./create-vendedor.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable

const Vendedor = props => (
  <Tr>
    <Td>{props.vendedor.documento}</Td>
    <Td>{props.vendedor.nombre}</Td>
    <Td>{props.vendedor.apellido1} {props.vendedor.apellido2}</Td>
    <Td><center><VerVendedor component={props.component} vendedor={props.vendedor} key={props.vendedor.documento}/></center></Td>
    <Td><center><button className={"btn " + (props.vendedor.estado ?  'btn-danger' : 'btn-success')} onClick={()=>props.component.confirmDialog(props.vendedor._id)}>{(props.vendedor.estado ? 'Desactivar' : 'Habilitar')}</button></center></Td>
  </Tr>
)

export default class VendedoresList extends Component {
  constructor() {
    super();
    this.state = { vendedores: [] };
  }

    vendedoresList() {
    return this.state.vendedores.map(currentVendedor => {
      return <Vendedor component={this} vendedor={currentVendedor} key={currentVendedor._id} />;
    })
  }

  componentDidMount() {
    this.fetchVendedores();
  }
  
  confirmDialog(id){
    Swal.fire({
      title: 'Estas seguro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00c70a',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.value) {
        this.inhabilitar(id)
      }
    })
  }
  inhabilitar(id){
    fetch('/api/vendedores/inhabilitar', {
      method: 'POST',
      body: JSON.stringify({'id': id}),
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
          if (data.id == 0) {

              Swal.fire({
                  text: data.mensaje,
                  type: 'error'
              })
          } else if (data.id == 1) {

            this.fetchVendedores();
            
            Swal.fire({
              text: data.mensaje,
              type: 'success',
              onClose: () => {
                location.reload();
              }
            })
          }else{
            Swal.fire({
              text: data.mensaje,
              type: 'error'
            })

          }
      })
      .catch(err => console.error(err));
  }

  fetchVendedores() {
    fetch('/api/vendedores')
      .then(res => res.json())
      .then(data => {
        this.setState({ vendedores: data });
        $("#tabla-vendedores").DataTable({
          "autoWidth": false,
          "destroy":true,
          "responsive":true,
          "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se han encontrado registros",
            "info": "(_MAX_ vendedores) Pagina _PAGE_ de _PAGES_",
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
                        <h3><i className="fa fa-id-card-o"></i> Vendedores disponibles</h3>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 col-xl-2">
                        <CreateVendedor component={this}/>
                    </div>
                </div>
            </div>
                
            <div className="card-body">
                <div className="table-responsive">
                <Table id="tabla-vendedores" className="table table-bordered table-hover display">
                    <Thead>
                        <Tr>
                            <Th><center>Documento</center></Th>
                            <Th><center>Nombre</center></Th>
                            <Th><center>Apellidos</center></Th>
                            <Th><center>Ver más</center></Th>
                            <Th><center>Habilitar/Inhabilitar</center></Th>
                        </Tr>
                    </Thead>                                        
                    <Tbody>
                        {this.vendedoresList()}
                    </Tbody>
                </Table>
                </div>
            </div>                                                      
        </div>
      </div>  
    )
  }
}