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
        <Td>{props.vendedor[0].documento}</Td>
        <Td>{props.vendedor[0].nombre}</Td>
        <Td>{props.vendedor[0].telefono}</Td>
        <Td>{props.vendedor[1]}</Td>

    </Tr>
)


export default class MejoresVendedores extends Component {
    constructor(props) {
        super(props);
        this.state = { vendedores: [] };
    }

    vendedoresList() {
        if (this.state.vendedores.length > 0) {//hay que cambiar a length 0 despues
            return this.state.vendedores.map(currentVendedor => {
                return <Vendedor session={this.props.session} component={this} vendedor={currentVendedor} key={currentVendedor._id} />;
            })
        } else {
            return (
                <Tr>
                    <Td colSpan="4">
                        <div className="alert alert-warning" role="alert">
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
                this.setState({ vendedores: data });
            })
            .catch(err => console.error(err));
    }
    render() {
        return (
            <div className="card mt-3 mb-5">
                <div className="card-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3><i className="fa fa-users"></i> Top 5 vendedores:</h3>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <Table id="tabla-mejores-vendedores" className="table table-sm table-hover table-striped table-bordered">
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
        )
    }

}