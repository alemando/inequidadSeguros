import React, { Component } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import Swal from 'sweetalert2'
import $ from 'jquery'
import DataTable from 'datatables.net'
$.DataTable = DataTable

//Revisar los nombres de los elementos
const Categoria = props => (
    <Tr>
        <Td>{props.categoria[0]}</Td>
        <Td>{props.categoria[1]}</Td>
    </Tr>
)


export default class CategoriasComunes extends Component {
    constructor(props) {
        super(props);
        this.state = { categorias: [] };
    }

    categoriasList() {
        try {
            return this.state.categorias.map(currentCategoria => {
                return <Categoria session={this.props.session} component={this} categoria={currentCategoria} key={currentCategoria._id} />;
            })
        } catch (error) {
            return (
                <Tr>
                    <Td colSpan="4">
                        <div className="alert alert-warning" role="alert">
                            {this.state.categorias}
                        </div>
                    </Td>
                </Tr>)
        }
    }

    componentDidMount() {
        this.fetchCategoriasComunes();
    }

    fetchCategoriasComunes() {
        fetch('/api/bienes/categoriesTopFive',{
            method: 'POST'
        })
            .then(res => res.json())
            .then(data => {
                var array = [];

                for (const key in data) {
                    array.push([key, data[key]]);
                }
                console.log(array);
                this.setState({ categorias: array });
            })
            .catch(err => console.error(err));
    }
    render() {
        return (
            <div className="card mt-3 mb-5">
                <div className="card-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <h3><i className="fa fa-sitemap"></i> Top 5 categorias:</h3>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="Table-responsive">
                        <Table id="tabla-categorias-comunes" className="table table-sm table-bordered table-hover table-striped">
                            <Thead>
                                <Tr>
                                    <Th><center>Nombre</center></Th>
                                    <Th><center>Cantidad de bienes</center></Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {this.categoriasList()}
                            </Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }

}