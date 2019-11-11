import React, { Component } from 'react';
import VerBien from "./ver-bien.component";

const TablaBien = props => (
  <tr>
    <td>{props.bien.nombre}</td>
    <td>{props.bien.categoria.nombre}</td>
    <td><VerBien bien={props.bien} key={props.bien._id}/></td>
  </tr>
)

export default class VerBienes extends Component {
  
  constructor() {
    super();

    this.state = {
      bienes: []
    }
    this.verBienes = this.verBienes.bind(this);
  }

  verBienes() {
    this.fetchBienes()
  }

  bienesList() {
    return this.state.bienes.map(currentBien => {
      return <TablaBien bien={currentBien} key={currentBien._id} />;
    })
  }

  fetchBienes() {
    fetch('/api/bienes/'+this.props.cliente, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ bienes: data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.verBienes} className="btn btn-primary" data-toggle="modal" data-target={"#Bienes" + this.props.cliente}>ver bienes</button>
        <div className="modal fade" id={"Bienes" +this.props.cliente} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Cliente</b></h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Ver mas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.bienesList()}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}