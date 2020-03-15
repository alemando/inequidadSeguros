import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable




const Seguro = props =>(
    <Tr>
        <Td>{props.seguro.cliente.nombre+" "+props.seguro.cliente.apellido1+" "+props.seguro.cliente.apellido2 }</Td>
        <Td>{props.seguro.bien.nombre}</Td>
        <Td>{props.seguro.aseguradora.nombre}</Td>
        <Td>{props.seguro.vendedor.nombre+" "+props.seguro.vendedor.apellido1+" "+props.seguro.vendedor.apellido2 }</Td>
        <Td><center><VerSeguro session={props.session} seguro={props.seguro} key={props.seguro._id}/></center></Td>
    </Tr>
)


export default class SegurosPendientes extends Component{
    constructor(props){
        super(props);
        this.state = { seguros: [] };
    }

    segurosPendientesList() {
        if (this.state.seguros != null) {
            return this.state.seguros.map(currentSeguro =>{
                return <Seguro session={this.props.session} component= {this} seguro= {currentSeguro} key={currentSeguro._id}/>;
            })
        } else{
            return(
                <Tr>
                    <Td colSpan="4">
                        <div class="alert alert-warning" role="alert">
                            No hay seguros pendientes
                        </div>
                    </Td>
                </Tr>
            )
        }
    }
    componentDidMount(){
        this.fetchSegurosPendientes();
    }
    fetchSegurosPendientes() {
        fetch('/api/seguros/pendientes')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({ seguros: data });
        })
        .catch(err => console.error(err));
    }

    render(){
        return(
            <div className="row">
                <div className="col-12">
                    <div className="card-body">
                        <div className="table-responsive">
                            <center><h3>Seguros Pendientes:</h3></center>
                            <Table id="seguros-pendientes" className="table table-sm table-success table-bordered">
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
            </div>
        )
    }

    }
