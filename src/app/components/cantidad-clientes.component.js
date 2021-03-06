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
        var f = new Date();
        function addZero(i) {
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        }
        var ma = f.getMonth()
        var dd = f.getDate();
        var mm = f.getMonth()+1;
        dd=addZero(dd);
        mm=addZero(mm);
        ma=addZero(ma)
        this.state = {
            fechaInicio: f.getFullYear() + "-" + ma  + "-" + dd ,
            fechaFin: f.getFullYear() + "-" + mm + "-" + dd ,
            clientes: null
         }
        this.searchClientes = this.searchClientes.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    searchClientes(){
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
                            <center>Seleccione una fecha</center>
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
                                    <Th><center>Fecha Inicial</center></Th>
                                    <Th><center>Fecha Final</center></Th>
                                    <Th><center>Cantidad de clientes nuevos</center></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Td><center><input className="form-control" type="date" defaultValue={this.state.fechaInicio} id="fechaInicio" name="fechaInicio"
                                    min="2015-01-01" max="2030-12-31" onChange={this.handleChange}
                                ></input></center></Td>

                                <Td><center><input className="form-control" type="date" defaultValue={this.state.fechaFin} id="fechaFin" name="fechaFin"
                                    min={this.state.fechaInicio} max="2030-12-31" onChange={this.handleChange}
                                ></input></center></Td>
                                {this.getClientes()}
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }

}