import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable

export default class CantidadSeguros extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fechaInicio: '',
            fechaFin: '',
            seguros: null
         }
        this.searchSeguros = this.searchSeguros.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    searchSeguros() {
        console.log(JSON.stringify(this.state));
        fetch('/api/seguros/betweenDates', {
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
            this.setState({ seguros: data });
          })
          .catch(err => console.error(err));
      }
    
      handleChange(e) {
        const { name, value } = e.target;
        this.setState({[name]: value}, () => { 
            this.searchSeguros();
        });
      }

      getSeguros() {
        if (this.state.seguros!=null) {
            return (
                <Td>
                    <center>
                        {this.state.seguros}
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
                            <h3><i className="fa fa-calendar-alt"></i> Cantidad de seguros vendidos:</h3>
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
                                    <Th>Cantidad de seguros nuevos</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Td><input className="form-control" type="date" id="fechaInicio" name="fechaInicio"
                                    min="2015-01-01" max="2030-12-31" onChange={this.handleChange}
                                ></input></Td>

                                <Td><input className="form-control" type="date" id="fechaFin" name="fechaFin"
                                    min={this.state.fechaInicio} max="2030-12-31" onChange={this.handleChange}
                                ></input></Td>
                                {this.getSeguros()}
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }

}