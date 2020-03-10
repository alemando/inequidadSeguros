import React, { Component } from 'react';
import Swal from 'sweetalert2';

function  statusCliente(documento) {

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
  .then(data => {
    if(data.id==1){
      Swal.fire({
        text: data.mensaje,
        type: 'success'
      });
      document.getElementById(documento).classList.remove("btn-danger");
      document.getElementById(documento).classList.add("btn-success");
      document.getElementById(documento).innerHTML="Activar";
    }else if(data.id==2){
      Swal.fire({
        text: data.mensaje,
        type: 'success'
      });
      document.getElementById(documento).classList.remove("btn-success");
      document.getElementById(documento).classList.add("btn-danger");
      document.getElementById(documento).innerHTML="Desactivar";
    }else{
      Swal.fire({
        text: data.mensaje,
        type: 'error'
      });
    }
    
  })
}

export default class EstadoCliente extends Component {

  render() {
    if(this.props.estadoActual){
      return (
      
        <center>
          <button type="button" id={this.props.cliente} className="btn btn-danger" onClick={() => statusCliente(this.props.cliente)}>Deshabilitar</button>
        </center>
      )
    }else{
      return (
      
        <center>
          <button type="button" id={this.props.cliente} className="btn btn-success" onClick={() => statusCliente(this.props.cliente)}>Habilitar</button>
        </center>
      )
    }
    
  }
}