import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable

//(this.props.session.esAdmin ? <Th><center>Habilitar/Inhabilitar</center></Th> : "")
//{this.vendedoresList()}

const Vendedor = props => (
    <Tr>
        <Td>{props.vendedor.documento}</Td>
        <Td>{props.vendedor.nombre}</Td>
        <Td>{props.vendedor.telefono}</Td>
        <Td>{props.vendedor.seguros}</Td>

    </Tr>
)


export default class MejoresVendedores extends Component {
    constructor(props) {
        super(props);
        this.state = { vendedores: [] };
    }

    vendedoresList() {
        if (this.state.vendedores != null) {//hay que cambiar a length 0 despues
            return this.state.vendedores.map(currentVendedor => {
                return <Vendedor session={this.props.session} component={this} vendedor={currentVendedor} key={currentVendedor._id} />;
            })
        } else {
            return (
                <Tr>
                    <Td colSpan="4">
                        <div class="alert alert-warning" role="alert">
                            No se han vendido seguros
                    </div>
                    </Td>
                </Tr>)
        }
    }

    componentDidMount() {
        this.fetchMejoresVendedores();
    }

    fetchMejoresVendedores() {
        fetch('/api/seguros/top5vendedores')
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
                            <Table id="tabla-mejores-vendedores" className="table table-sm table-success table-bordered">
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