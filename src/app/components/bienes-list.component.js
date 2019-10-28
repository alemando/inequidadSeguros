import React, { Component } from 'react';

const Bien = props => (
  <tr>
    <td>{props.bien.id}</td>
    <td>{props.bien.documentoCliente}</td>
    <td>{props.bien.categoria}</td>
    <td>{props.bien.caracteristicas}</td>
    <td>{props.bien.documentos}</td>
  </tr>
)

export default class BienesList extends Component {
  constructor() {
    super();

    this.state = {bienes: []};
  }

    bienesList() {
        return this.state.bienes.map(currentBien => {
            return <Bien bien={currentBien} key={currentBien._id}/>;
        })
    }

  
    componentDidMount(){
        this.fetchBienes();
    }

    fetchBienes() {
        fetch('/api/bienes')
            .then(res => res.json())
            .then(data => { 
                this.setState({bienes: data});
            })
            .catch(err => console.error(err));
    }


  render() {
    return (
      <div>
        <h3>Bienes</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>id</th>
              <th>documentoCliente</th>
              <th>categoria</th>
              <th>caracteristicas</th>
              <th>documentos</th>
            </tr>
          </thead>
          <tbody>
            { this.bienesList() }
          </tbody>
        </table>
      </div>
    )
  }
}