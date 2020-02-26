import React, { Component } from 'react';
import Swal from 'sweetalert2';

function  eliminarBien(id) {
  var url = '/api/bienes/remove';
  var data = {"id": id,
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
    Swal.fire({
      text: data,
      type: 'info'
    });
    location.reload()
  })
}

export default class VerBien extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <center>
          <button type="button" id={this.props.bien._id} className="btn btn-danger" onClick={() => eliminarBien(this.props.bien._id)}>Eliminar</button>
      </center>
    )
  }
}