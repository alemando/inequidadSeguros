import React, { Component } from 'react';
import VerVendedor from "./ver-vendedor.component";
import CreateVendedor from "./create-vendedor.component";

const Vendedor = props => (
  <tr>
    <td>{props.vendedor.documento}</td>
    <td>{props.vendedor.nombre}</td>
    <td>{props.vendedor.apellido1} {props.vendedor.apellido2}</td>
    <td><center><VerVendedor vendedor={props.vendedor} key={props.vendedor.documento}/></center></td>
  </tr>
)

export default class VendedoresList extends Component {
  constructor() {
    super();
    this.state = { vendedores: [] };
  }

    vendedoresList() {
    return this.state.vendedores.map(currentVendedor => {
      return <Vendedor vendedor={currentVendedor} key={currentVendedor._id} />;
    })
  }

  componentDidMount() {
    this.fetchVendedores();
  }

  fetchVendedores() {
    fetch('/api/vendedores')
      .then(res => res.json())
      .then(data => {
        this.setState({ vendedores: data });
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
                        <h3><i className="fa fa-id-card-o"></i> Vendedores disponibles</h3>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 col-xl-2">
                        <CreateVendedor component={this}/>
                    </div>
                </div>
            </div>
                
            <div className="card-body">
                <div className="table-responsive">
                <table id="tabla-vendedores" className="table table-bordered table-hover display">
                    <thead>
                        <tr>
                            <th><center>Documento</center></th>
                            <th><center>Nombre</center></th>
                            <th><center>Apellidos</center></th>
                            <th><center>Ver más</center></th>
                        </tr>
                    </thead>                                        
                    <tbody>
                        {this.vendedoresList()}
                    </tbody>
                </table>
                </div>
                
            </div>                                                      
        </div>
      </div>  
    )
  }
}