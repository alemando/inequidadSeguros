import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable

//(this.props.session.esAdmin ? <Th><center>Habilitar/Inhabilitar</center></Th> : "")
//{this.vendedoresList()}

const Aseguradora = props => (
    <Tr>
        <Td>{props.aseguradora.nit}</Td>
        <Td>{props.aseguradora.nombre}</Td>
        <Td>{props.aseguradora.seguros}</Td>
    </Tr>
)


export default class MejoresAseguradoras extends Component {
    constructor(props) {
        super(props);
        this.state = { aseguradoras: [] };
    }

    aseguradorasList() {
        if (this.state.aseguradoras != null) {//hay que cambiar a length 0 despues
            return this.state.aseguradoras.map(currentAseguradora => {
                return <Aseguradora session={this.props.session} component={this} aseguradora={currentAseguradora} key={currentAseguradora._id} />;
            })
        } else {
            return (
                <Tr>
                    <td colSpan="4">
                        <div class="alert alert-warning" role="alert">
                            No hay mejores aseguradoras
                    </div>
                    </td>
                </Tr>)
        }
    }

    componentDidMount() {
        this.fetchMejoresAseguradoras();
    }

    fetchMejoresAseguradoras() {
        fetch('/api/Aseguradoras/mejores')
            .then(res => res.json())
            .then(data => {
                this.setState({ aseguradoras: data });
            })
            .catch(err => console.error(err));
    }
    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="card-body">
                        <div className="table-responsive">
                            <center><h3>Top 5 aseguradoras:</h3></center>
                            <Table id="tabla-mejores-vendedores" className="table table-sm ">
                                <Thead>
                                    <Tr>
                                        <Th><center>Nit</center></Th>
                                        <Th><center>Nombre</center></Th>
                                        <Th><center>Seguros vendidos</center></Th>
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