import React, { Component } from 'react';

const TablaBien = props => (
  <tr>
    <td>{props.bien.id}</td>
    <td>{props.bien.nombre_de_referencia}</td>
    <td>{props.bien.caracteristicas}</td>
    <button className="btn btn-primary">descarga</button>
  </tr>
)

export default class VerBienes extends Component {
  
  constructor() {
    super();

    this.state = {
      bienes: [],
      showModal: false
    }
    this.verBienes = this.verBienes.bind(this);
  }

  verBienes() {
    this.fetchBienes()
  }

  bienesList() {
    return this.state.bienes.map(currentBien => {
      return <TablaBien bien={currentBien} key={currentBien.id} />;
    })
  }

  fetchBienes() {
    fetch('/api/bienes/'+this.props.documento, {
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
        <button type="button" onClick={this.verBienes} className="btn btn-primary" data-toggle="modal" data-target={"#Bienes" + this.props.documento}>ver bienes</button>
        <div className="modal fade" id={"Bienes" +this.props.documento} tabIndex="-1" role="dialog" aria-hidden="true">
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
                        <th>id</th>
                        <th>Nombre de referencia</th>
                        <th>Caracteristicas</th>
                        <th>Documento</th>
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