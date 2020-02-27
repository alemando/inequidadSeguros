import React, { Component } from 'react';
import VerAseguradora from "./ver-aseguradora.component";
import CreateAseguradora from "./create-aseguradora.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable

const Aseguradora = props => (
  <Tr>
    <Td>{props.aseguradora.nit}</Td>
    <Td>{props.aseguradora.nombre}</Td>
    <Td>{props.aseguradora.telefono}</Td>
    <Td>{props.aseguradora.correo}</Td>
    <Td><button className={"btn " + (props.aseguradora.estado ? 'btn-success' : 'btn-danger')} onClick={()=>props.component.confirmDialog(props.aseguradora._id)}>{(props.aseguradora.estado ? 'Desactivar' : 'Activar')}</button></Td>
    <Td><center><VerAseguradora component={props.component} aseguradora={props.aseguradora} key={props.aseguradora.nit}/></center></Td>
  </Tr>
)

export default class AseguradorasList extends Component {
  constructor() {
    super();

    this.state = {aseguradoras: []};
  }

    aseguradorasList() {
        return this.state.aseguradoras.map(currentAseguradora => {
            return <Aseguradora component={this} aseguradora={currentAseguradora} key={currentAseguradora._id}/>;
        })
    }

    componentDidMount(){
        this.fetchAseguradoras();
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
          this.changeEstado(id)
        }
      })
    }

    changeEstado(id){
      fetch('/api/aseguradoras/disable', {
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

              this.fetchAseguradoras();
              
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

    fetchAseguradoras() {
        fetch('/api/aseguradoras')
            .then(res => res.json())
            .then(data => {
                this.setState({aseguradoras: data});
                $("#tabla-aseguradoras").DataTable({
                  "autoWidth": false,
                  "destroy":true,
                  "responsive":true,
                  "language": {
                    "lengthMenu": "Mostrar _MENU_ registros por pagina",
                    "zeroRecords": "No se han encontrado registros",
                    "info": "(_MAX_ aseguradoras) Pagina _PAGE_ de _PAGES_",
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
                        <h3><i className="fa fa-handshake-o"></i> Aseguradoras disponibles</h3>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 col-xl-2">
                        <CreateAseguradora component={this}/>
                    </div>
                </div>
            </div>
                
            <div className="card-body">
                <div className="table-responsive">
                <Table id="tabla-aseguradoras" className="table table-bordered table-hover display">
                    <Thead>
                        <Tr>
                            <Th><center>Nit</center></Th>
                            <Th><center>Nombre</center></Th>
                            <Th><center>Telefono</center></Th>
                            <Th><center>Correo</center></Th>
                            <Th><center>Habilitar / <br></br> Deshabilitar</center></Th>
                            <Th><center>Editar</center></Th>
                        </Tr>
                    </Thead>                                        
                    <Tbody>
                        {this.aseguradorasList()}
                    </Tbody>
                </Table>
                </div>
                
            </div>                                                      
        </div>
      </div>
    )
  }
}