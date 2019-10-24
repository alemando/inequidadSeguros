import React, { Component } from 'react';

const Aseguradora = props => (
  <tr>
    <td>{props.aseguradora.nit}</td>
    <td>{props.aseguradora.nombre}</td>
    <td>{props.aseguradora.telefono}</td>
    <td>{props.aseguradora.correo}</td>
  </tr>
)

export default class AseguradorasList extends Component {
  constructor() {
    super();

    this.state = {aseguradoras: []};
  }

    aseguradorasList() {
        return this.state.aseguradoras.map(currentAseguradora => {
            return <Aseguradora aseguradora={currentAseguradora} key={currentAseguradora._id}/>;
        })
    }

  
    componentDidMount(){
        this.fetchAseguradoras();
    }

    fetchAseguradoras() {
        fetch('/api/aseguradoras')
            .then(res => res.json())
            .then(data => {
                this.setState({aseguradoras: data});
            })
            .catch(err => console.error(err));
    }


  render() {
    return (
      <div>
        <h3>Aseguradoras</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>nit</th>
              <th>nombre</th>
              <th>telefono</th>
              <th>correo</th>
            </tr>
          </thead>
          <tbody>
            { this.aseguradorasList() }
          </tbody>
        </table>
      </div>
    )
  }
}