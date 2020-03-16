import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
import { render } from 'react-dom';
$.DataTable = DataTable





export default class CantidadClientes extends Component {
    constructor(props) {
        super(props);
        this.state = { Clientes: [] };
    }






    render() {
        return (
            <div className="card mt-3">
                <div className="card-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3><i className="fa fa-calendar-alt"></i> Cantidad de clientes nuevos:</h3>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table responsive">
                        <Table id="cantidad-clientes" className="table table-sm">
                            <Thead>
                                <Tr>
                                    <Th>Fecha Inicial</Th>
                                    <Th>Fecha Final</Th>
                                    <Th>Cantidad de clientes nuevos</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Td><input type="date" id="start" name="trip-start"
                                    min="2015-01-01" max="2030-12-31"
                                ></input></Td>

                                <Td><input type="date" id="end" name="trip-start"
                                    min="2015-01-01" max="2030-12-31"
                                ></input></Td>
                                <Td></Td>
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }

}