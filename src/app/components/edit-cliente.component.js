import React, { Component } from 'react';
import $ from 'jquery'
import Swal from 'sweetalert2'

export default class EditCliente extends Component {

  constructor(props) {
    super();
    this.state = {
      documento: props.cliente.documento,
      nombre: props.cliente.nombre,
      apellido1: props.cliente.apellido1,
      apellido2: props.cliente.apellido2,
      direccion: props.cliente.direccion,
      telefono: props.cliente.telefono,
      correo: props.cliente.correo,
      fechaNacimiento: props.cliente.fechaNacimiento,
      ingresos: props.cliente.ingresos,
      egresos: props.cliente.egresos
    }
    this.EditCliente = this.editCliente.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  editCliente(e) {
    e.preventDefault();
    fetch('/api/clientes/update', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.id == 0) {

          Swal.fire({
            text: data.mensaje,
            type: 'error'
          })
        } else if (data.id == 1) {

          this.props.component.fetchClientes();

          Swal.fire({
            text: data.mensaje,
            type: 'success'
          })

          $('EditarCliente-' + this.props.cliente._id).modal('hide');
          $('formEditarCliente-'+ this.props.cliente._id).reset();

          this.setState({
            documento: '',
            nombre: '',
            apellido1: '',
            apellido2: '',
            direccion: '',
            telefono: '',
            correo: '',
            fechaNacimiento: '',
            ingresos: 0,
            egresos: 0
          });
        } else {
          Swal.fire({
            text: data.mensaje,
            type: 'error'
          })
        }
      })
      .catch(err => console.error(err));
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  handleKeypress(e) {
    const characterCode = e.key
    if (characterCode === 'Backspace') return

    const characterNumber = Number(characterCode)
    if (characterNumber >= 0 && characterNumber <= 9) {
      if (e.currentTarget.value && e.currentTarget.value.length) {
        return
      }
    } else {
      e.preventDefault()
    }
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={'#EditarCliente-' + this.props.cliente._id}>Editar cliente</button>

        <div className="modal fade" id={'EditarCliente-' + this.props.cliente._id} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Editar cliente</b></h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id={'formEditarCliente-'+ this.props.cliente._id} onSubmit={this.editCliente}>
                  <div className="form-group">
                    <label>* Documento:</label>
                    <input name="documento" onChange={this.handleChange} type="text"
                      required
                      value={this.state.documento}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>* Nombre:</label>
                    <input name="nombre" onChange={this.handleChange} type="text"
                      required
                      value={this.state.nombre}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>* Primer apellido:</label>
                    <input name="apellido1" onChange={this.handleChange} type="text"
                      required
                      value={this.state.apellido1}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Segundo apellido:</label>
                    <input name="apellido2" onChange={this.handleChange} type="text"
                      required
                      value={this.state.apellido2}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>* Dirección:</label>
                    <input name="direccion" onChange={this.handleChange} type="text"
                      required
                      value={this.state.direccion}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>* Telefono:</label>
                    <input name="telefono" onChange={this.handleChange} onKeyDown={this.handleKeypress} type="number"
                      required
                      value={this.state.telefono}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>* Correo:</label>
                    <input name="correo" onChange={this.handleChange} type="email"
                      required
                      value={this.state.correo}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>* Fecha nacimineto:</label>
                    <input name="fechaNacimiento" onChange={this.handleChange} type="date"
                      required
                      value={this.state.fechaNacimiento}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>* Ingresos:</label>
                    <input name="ingresos" onChange={this.handleChange} type="number"
                      required
                      value={this.state.ingresos}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>* Egresos:</label>
                    <input name="egresos" onChange={this.handleChange} type="number"
                      required
                      value={this.state.egresos}
                      className="form-control"
                    />
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>Todos los campos con * son obligatorios</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="submit" form="formCliente" className="btn btn-primary">Enviar</button>
                <button type="button" className="btn btn-secondary"  data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
