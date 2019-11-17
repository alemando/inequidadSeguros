import React, { Component } from 'react';
import CreateCategoria from "./create-categoria.component";
import VerCriterios from "./ver-criterios.component";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

const Categoria = props => (
  <Tr>
    <Td>{props.categoria.nombre}</Td>
    <Td><center><VerCriterios categoria={props.categoria}/></center></Td>
  </Tr>
)

export default class CategoriasList extends Component {
  constructor() {
    super();
    this.state = {

      categorias: []
    };
  }

  categoriasList() {
    return this.state.categorias.map(currentCategoria => {
      return <Categoria categoria={currentCategoria} key={currentCategoria._id} />;
    })
  }

  componentDidMount() {
    this.fetchCategorias();
  }

  fetchCategorias() {
    fetch('/api/categorias')
      .then(res => res.json())
      .then(data => {
        this.setState({ categorias: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div className="card mb-3">
            <div className="card-header">
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-8 col-lg-10 col-xl-10">
                        <h3><i className="fa fa-archive"></i> Categorias disponibles</h3>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 col-xl-2">
                        <CreateCategoria component={this}/>
                    </div>
                </div>
            </div>
                
            <div className="card-body">
                <div className="table-responsive">
                <Table id="tabla-categorias" className="table table-bordered table-hover display">
                    <Thead>
                        <Tr>
                            <Th><center>Nombre</center></Th>
                            <Th><center>Ver criterios</center></Th>
                        </Tr>
                    </Thead>                                        
                    <Tbody>
                        {this.categoriasList()}
                    </Tbody>
                </Table>
                </div>
                
            </div>                                                      
        </div>
      </div>
    )
  }
}