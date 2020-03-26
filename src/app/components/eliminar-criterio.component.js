import React, { Component } from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2'
export default class EliminarCriterio extends Component {

  constructor(props) {
    super(props);
    this.eliminarCriterio = this.eliminarCriterio.bind(this);

  }

  eliminarCriterio() {
      fetch('/api/categorias/removeCriterio', {
        method: 'POST',
        body: JSON.stringify({
            idCategoria:this.props.idCategoria,
            nombreCriterio:this.props.criterio
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => {
          if(data.id == 0){
            Swal.fire({
              text: data.mensaje,
              type: 'error'
            })
          }else if(data.id == 1){
            Swal.fire({
              text: data.mensaje,
              type: 'success',
              onClose: () => {
                location.reload();
              }
            })

          } else {
              Swal.fire({
                  text: data.mensaje,
                  type: 'error'
              })
          }
        })
        .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-danger" onClick={this.eliminarCriterio}>Eliminar</button>
    </div>
    )
  }
}