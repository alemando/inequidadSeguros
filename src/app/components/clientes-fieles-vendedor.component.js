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
        <Td>{props.vendedor.nombre}</Td>
        <Td>{props.vendedor.celular}</Td>
        <Td>{props.vendedor.seguros}</Td>  {/* Definir bien esto para pajoy*/}

    </Tr>
)



export default class ClientesFieles extends Component {
    constructor(props) {
        super(props);
        this.state = { clientes: [] };
    }

    vendedoresList() {
        if (this.state.clientes != null) {//hay que cambiar a length 0 despues
            return this.state.clientes.map(currentCliente => {
                return <Vendedor session={this.props.session} component={this} cliente={currentCliente} key={currentCliente._id} />;
            })
        } else {
            return (
                <Tr>
                    <td colSpan="4">
                        <div class="alert alert-warning" role="alert">
                            Aun no has vendido seguros
                    </div>
                    </td>
                </Tr>)
        }
    }

    componentDidMount() {
        this.fetchMejoresVendedores();
    }

    fetchMejoresVendedores() {
        fetch('/api/Clientes/bestclients')
            .then(res => res.json())
            .then(data => {
                this.setState({ vendedores: data });
            })
            .catch(err => console.error(err));
    }
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card-body">
                        <div className="table-responsive">
                            <center><h3>Top 5 vendedores:</h3></center>
                            <Table id="tabla-mejores-vendedores" className="table table-sm ">
                                <Thead>
                                    <Tr>
                                        <Th><center>Documento</center></Th>
                                        <Th><center>Nombre</center></Th>
                                        <Th><center>Celular</center></Th>
                                        <Th><center>Seguros vendidos</center></Th>
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