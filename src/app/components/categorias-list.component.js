import React, { Component } from 'react';
import CreateCategoria from "./create-categoria.component";
import VerCriterios from "./ver-criterios.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable

const Categoria = props => (
  <Tr>
    <Td>{props.categoria.nombre}</Td>
    <Td><center><VerCriterios categoria={props.categoria} /></center></Td>
    <Td><center><button className={"btn " + (props.categoria.estado ? 'btn-danger' : 'btn-success')} onClick={()=>props.component.confirmDialog(props.categoria._id)}>{(props.categoria.estado ? 'Desactivado' : 'Habilitado')}</button></center></Td>
  </Tr>
)

export default class CategoriasList extends Component {
  constructor() {
    super();
    this.state = {categorias: []}; 
  }

  categoriasList() {
    return this.state.categorias.map(currentCategoria => {
      return <Categoria component={this}categoria={currentCategoria} key={currentCategoria._id} />;
    })
  }

  componentDidMount() {
    this.fetchCategorias();
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
        this.cambiarEstadoCat(id)
      }
    })
  }
  cambiarEstadoCat(id){
    fetch('/api/categorias/disable', {
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

            this.fetchCategorias();
            
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

  fetchCategorias() {
    fetch('/api/categorias')
      .then(res => res.json())
      .then(data => {
        this.setState({ categorias: data });
        $("#tabla-categorias").DataTable({
          "autoWidth": false,
          "destroy":true,
          "responsive":true,
          "language": {
            "lengthMenu": "Mostrar _MENU_ registros por pagina",
            "zeroRecords": "No se han encontrado registros",
            "info": "(_MAX_ categorias) Pagina _PAGE_ de _PAGES_",
            "search": "Buscar",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(registros disponibles _MAX_)"
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
                <h3><i className="fa fa-archive"></i>Categorias disponibles</h3>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 col-xl-2">
                <CreateCategoria component={this} />
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <Table id="tabla-categorias" className="table table-bordered table-hover display">
                <Thead>
                  <Tr>
                    <Th><center>Nombre</center></Th>
                    <Th><center>Ver criterios</center></Th>
                    <Th><center>Habilitar/Desactivar</center></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {this.categoriasList()}
                </Tbody>
              </Table>
            </div>

          </div>
        </div>
      </div>
    )
  }
}