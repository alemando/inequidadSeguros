import React, { Component } from 'react';
import CreateSeguro from "./create-seguro.component";
import VerSeguro from "./ver-seguro.component";

const Seguro = props => (
  <tr>
    <td>{props.seguro.cliente.nombre+" "+props.seguro.cliente.apellido1+" "+props.seguro.cliente.apellido2 }</td>
    <td>{props.seguro.bien.nombre}</td>
    <td>{props.seguro.aseguradora.nombre}</td>
    <td>{props.seguro.vendedor.nombre+" "+props.seguro.vendedor.apellido1+" "+props.seguro.vendedor.apellido2 }</td>
    <td><VerSeguro seguro={props.seguro} key={props.seguro._id}/></td>
  </tr>
)

export default class SegurosList extends Component {
  constructor() {
    super();

    this.state = {seguros: []};
  }

    segurosList() {
        return this.state.seguros.map(currentSeguro => {
            return <Seguro seguro={currentSeguro} key={currentSeguro._id}/>;
        })
    }


    componentDidMount(){
        this.fetchSeguros();
    }

    fetchSeguros() {
        fetch('/api/seguros')
            .then(res => res.json())
            .then(data => {
                this.setState({seguros: data});
            })
            .catch(err => console.error(err));
    }


  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col"><h3 align="left">Seguros</h3></div>
          <div className="col"> <CreateSeguro component={this}/></div>
        </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Cliente</th>
              <th>Bien</th>
              <th>Aseguradora</th>
              <th>Vendedor</th>
              <th>Ver mas</th>
            </tr>
          </thead>
          <tbody>
            { this.segurosList() }
          </tbody>
        </table>
      </div>
    )
  }
}
