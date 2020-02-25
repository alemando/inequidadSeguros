import React, { Component } from 'react';

export default class EstadoCliente extends Component {

  statusCliente(documento) {

    var url = '/api/clientes/status';
    var data = {"documento": documento,
                "admin":true};

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(data => console.log('Success:', data))
  }

  render() {
    return (
      <center>
        <button type="button" className="btn btn-danger" onClick={this.statusCliente.bind(this.props.cliente)}>Desactivar</button>
      </center>
    )
  }
}