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
        this.state = { clientes: [] };
    }


cantidadClientes(){

}

componentDidMount(){
    this.fetchClientesenFechas();
}
fetchClientesenFechas() { 
    fetch('api/cantidadClientesFechas')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({ clientes: data });
        })
        .catch(err => console.error(err));
}

render() {
    return(
        <div className="row">
            <div className="col-12">
                <div className="card-body">
                    <div className="table responsive">
                        <center><h3>Cantidad de clientes nuevos:</h3></center>
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
                                        value="2020-03-01"
                                        min="2015-01-01" max="2030-12-31"
                                        ></input></Td>
                                
                                <Td><input type="date" id="end" name="trip-start"
                                        value="2020-03-16"
                                        min="2015-01-01" max="2030-12-31"
                                        ></input></Td> 
                                <Td>
                                    
                                </Td>
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

}