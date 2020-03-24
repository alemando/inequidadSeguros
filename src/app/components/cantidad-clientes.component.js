import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable

export default class CantidadClientes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fechaInicio: '',
            fechaFin: '',
            clientes: null
         }
        this.searchClientes = this.searchClientes.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    searchClientes() {
        console.log(JSON.stringify(this.state));
        fetch('/api/clientes/cantidadClientesFechas', {
          method: 'POST',
          body: JSON.stringify(this.state),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.setState({ clientes: data.mensaje });
          })
          .catch(err => console.error(err));
      }
    
      handleChange(e) {
        const { name, value } = e.target;
        this.setState({[name]: value}, () => { 
            this.searchClientes();
        });
      }

      getClientes() {
        if (this.state.clientes!=null) {
            return (
                <Td>
                    <center>
                        {this.state.clientes}
                    </center>
                </Td>
            )
        } else {
            return (
                <Td>
                    <div className="alert alert-sm alert-info" role="alert">
                            Seleccione una fecha
                    </div>
                </Td>)
        }
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
                    <div className="Table responsive">
                        <Table id="cantidad-clientes" className="table table-sm">
                            <Thead>
                                <Tr>
                                    <Th>Fecha Inicial</Th>
                                    <Th>Fecha Final</Th>
                                    <Th>Cantidad de clientes nuevos</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Td><input className="form-control" type="date" id="fechaInicio" name="fechaInicio"
                                    min="2015-01-01" max="2030-12-31" onChange={this.handleChange}
                                ></input></Td>

                                <Td><input className="form-control" type="date" id="fechaFin" name="fechaFin"
                                    min={this.state.fechaInicio} max="2030-12-31" onChange={this.handleChange}
                                ></input></Td>
                                {this.getClientes()}
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }

}