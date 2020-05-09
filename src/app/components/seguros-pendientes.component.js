import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Swal from 'sweetalert2';
import VerSeguro from "./ver-seguro.component";
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable





const Seguro = props =>(
    <Tr>
        <Td><center>{props.seguro.vendedor.nombre+" "+props.seguro.vendedor.apellido1+" "+props.seguro.vendedor.apellido2 }</center></Td>
        <Td><center>{props.seguro.aseguradora.nombre}</center></Td>
        <Td><center>{props.seguro.cliente.nombre+" "+props.seguro.cliente.apellido1+" "+props.seguro.cliente.apellido2 }</center></Td>
        <Td><center>{props.seguro.bien.nombre}</center></Td>
        <Td><center><VerSeguro session={props.session} seguro={props.seguro} key={props.seguro._id}/></center></Td>
        {(props.session.esAdmin ? <Td><center><button className={"btn btn-success"} onClick={()=>props.component.confirmDialog(props.seguro._id, "true")}>{'Aprobar'}</button>  <button className={"btn btn-danger"} onClick={()=>props.component.confirmDialog(props.seguro._id, "false")}>{'Rechazar'}</button></center></Td>: "")}
    </Tr>
)


export default class SegurosPendientes extends Component{
    constructor(props){
        super(props);
        this.state = { seguros: [], 
        id: '',
        estado: ''}
    }

    segurosPendientesList() {
            return this.state.seguros.map(currentSeguro =>{
                return <Seguro session={this.props.session} component= {this} seguro= {currentSeguro} key={currentSeguro._id}/>;
            })
    }
    componentDidMount(){
        this.fetchSegurosPendientes();
    }
    confirmDialog(id, status){
        Swal.fire({
            title: '¿Estás seguro?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00c70a',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then((result)=>{
            if (result.value) {
                fetch('/api/seguros/finiquitar/' + id, {
                    method: 'POST',
                    body: JSON.stringify({ estado: status }),
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
    
              Swal.fire({
                text: data.mensaje,
                type: 'success',
                onClose: () => {
                  location.reload();
                }
              })
            } else {
              Swal.fire({
                text: data.mensaje,
                type: 'error'
              })
    
            }
          })
          .catch(err => console.error(err));
      }
    })
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
          [name]: value
        })
        console.log(this.state)
      }
    
    fetchSegurosPendientes() {
        fetch('/api/seguros/pendientes')
        .then(res => res.json())
        .then(data => {
            this.setState({ seguros: data });
            $("#seguros-pendientes").DataTable({
                "autoWidth": false,
                "destroy":true,
                "responsive":true,
                "language": {
                  "lengthMenu": "Mostrar _MENU_ registros por pagina",
                  "zeroRecords": "No se han encontrado registros",
                  "info": "(_MAX_ seguros) Pagina _PAGE_ de _PAGES_",
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

    render(){
        return(
          <div className="card mt-3">
            <div className="card-header">
              <div className="row">
                <div className="col-sm-12">
                  <h3><i className="fa fa-plus-square"></i> Seguros pendientes</h3>
                </div>
              </div>
            </div>							
            <div className="card-body">
              <div className="Table-responsive">
                  <Table id="seguros-pendientes" className="table table-bordered table-hover display">
                      <Thead>
                          <Tr>
                              <Th><center>Vendedor</center></Th>
                              <Th><center>Aseguradora</center></Th>
                              <Th><center>Cliente</center></Th>
                              <Th><center>Bien</center></Th>
                              <Th><center>Ver más</center></Th>
                              <Th><center>Cambiar Estado</center></Th>
                          </Tr>
                      </Thead>
                      <Tbody>
                          {this.segurosPendientesList()}
                      </Tbody>
                  </Table>
              </div>
            </div>													
          </div>
        )
    }

    }
