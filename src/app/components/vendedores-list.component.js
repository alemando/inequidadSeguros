import React, { Component } from 'react';
import VerVendedor from "./ver-vendedor.component";
import CreateVendedor from "./create-vendedor.component";

const Vendedor = props => (
  <tr>
    <td>{props.vendedor.documento}</td>
    <td>{props.vendedor.nombre}</td>
    <td>{props.vendedor.apellido1} {props.vendedor.apellido2}</td>
    <td><VerVendedor vendedor={props.vendedor} key={props.vendedor.documento}/></td>
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
      <div className="container">
        <div className="row">
          <div className="col"><h3>Vendedores</h3></div>
          <div className="col"> <CreateVendedor component={this}/></div>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Documento</th>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Ver más</th>
            </tr>
          </thead>
          <tbody>
            {this.vendedoresList()}
          </tbody>
        </table>
      </div>
    )
  }
}