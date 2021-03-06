import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable


const Cliente = props => (
    <Tr>
        <Td><center>{props.cliente.cliente.documento}</center></Td>
        <Td><center>{props.cliente.cliente.nombre}</center></Td>
        <Td><center>{props.cliente.cliente.apellido1} {props.cliente.cliente.apellido2}</center></Td>
        <Td><center>{props.cliente.count}</center></Td>

    </Tr>
)



export default class ClientesFieles extends Component {
    constructor(props) {
        super(props);
        this.state = { clientes: [] };
    }

    clientesList() {

        if (this.state.clientes.length > 0) {
            return this.state.clientes.map(currentCliente => {
                return <Cliente session={this.props.session} component={this} cliente={currentCliente} key={currentCliente._id} />;
            })
        } else {
            return (
                <Tr>
                    <Td colSpan="4">
                        <div class="alert alert-warning" role="alert">
                            <center>Aun no has vendido seguros</center>
                        </div>
                    </Td>
                </Tr>)
        }
    }

    componentDidMount() {
        this.fetchClientesFileles();
    }

    fetchClientesFileles() {
        fetch('/api/clientes/bestclients')
            .then(res => res.json())
            .then(data => {
                this.setState({ clientes: data });
            })
            .catch(err => console.error(err));
    }
    render() {
        return (
            <div className="card mt-3 mb-5">
                <div className="card-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3><i className="fa fa-user"></i> Cliente(s) mas fiel(es):</h3>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="Table-responsive">
                        <Table id="tabla-clientes-fieles" className="table table-sm table-bordered table-hover table-striped">
                            <Thead>
                                <Tr>
                                    <Th><center>Documento</center></Th>
                                    <Th><center>Nombre</center></Th>
                                    <Th><center>Apellidos</center></Th>
                                    <Th><center>Seguros comprados</center></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {this.clientesList()}
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }

}