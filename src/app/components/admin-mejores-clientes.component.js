import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable

//(this.props.session.esAdmin ? <Th><center>Habilitar/Inhabilitar</center></Th> : "")
//{this.vendedoresList()}

const Cliente = props => (
    <Tr>
        <Td>{props.cliente.documento}</Td>
        <Td>{props.cliente.nombres}</Td>
        <Td>{props.cliente.apellidos}</Td>
        <Td>{props.cliente.seguros}</Td>

    </Tr>
)


export default class MejoresClientes extends Component {
    constructor(props) {
        super(props);
        this.state = { clientes: [] };
    }

    clientesList() {
        if (this.state.clientes != null) {//hay que cambiar a length 0 despues
            return this.state.clientes.map(currentCliente => {
                return <Cliente session={this.props.session} cliente={currentCliente} key={currentCliente._id} component={this}/>;
              })
        } else {
            return (
                <Tr>
                    <Td colSpan="4">
                        <div class="alert alert-warning" role="alert">
                            Ningun cliente a comprado seguros aun
                    </div>
                    </Td>
                </Tr>)
        }
    }

    componentDidMount() {
        this.fetchMejoresClientes();
    }

    fetchMejoresClientes() {
        fetch('/api/clientes/topcinco')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ clientes: data.top });
            })
            .catch(err => console.error(err));
    }
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card-body">
                        <div className="table-responsive">
                            <center><h3>Top 5 clientes:</h3></center>
                            <Table id="tabla-mejores-clientes" className="table table-sm table-bordered">
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
            </div>
        )
    }

}
