import React, { Component } from 'react';

const Seguro = props => (
  <tr>
    <td>{props.seguro.documentoVendedor}</td>
    <td>{props.seguro.documentoCliente}</td>
    <td>{props.seguro.idBien}</td>
    <td>{props.seguro.nitAseguradora}</td>
    <td>{new Date(props.seguro.fechaInicio).toISOString().slice(0,10)}</td>
    <td>{new Date(props.seguro.fechaFin).toISOString().slice(0,10)}</td>
    <td>{props.seguro.valorTotal}</td>
    <td>{props.seguro.fechaPago}</td>
    <td>{props.seguro.estado}</td>
    <td>{props.seguro.observaciones}</td>
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
      <div>
        <h3>Seguros</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>documentoVendedor</th>
              <th>documentoCliente</th>
              <th>idBien</th>
              <th>nitAseguradora</th>
              <th>fechaInicio </th>
              <th>fechaFin</th>
              <th>valorTotal</th>
              <th>fechaPago</th>
              <th>estado</th>
              <th>observaciones</th>
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
