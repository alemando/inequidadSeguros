import React, { Component } from 'react';
import moment from 'moment'
import Swal from 'sweetalert2'

export default class VerCliente extends Component {
  constructor(props) {
    super();
    this.state = {
      editMode: false,
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
    this.editCliente = this.editCliente.bind(this);
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
            type: 'success',
            onClose: () => {
              location.reload();
            }
          })

          $('EditarCliente-' + this.props.cliente._id).modal('hide');
          $('formEditarCliente-' + this.props.cliente._id).reset();

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
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Cliente" + this.props.cliente.documento}>Ver más</button>
        <div className="modal fade" id={"Cliente" + this.props.cliente.documento} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Cliente</b> {this.props.cliente.nombre + " " + this.props.cliente.apellido1 + " " + this.props.cliente.apellido2}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Documento</b></div>
                        <div className="col-md-6 ml-auto">{this.props.cliente.documento}</div>

                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Nombre</b></div>
                        {(this.state.editMode ? <div className="col-md-6 ml-auto"><input name="nombre" onChange={this.handleChange} type="text"
                          required
                          value={this.state.nombre}
                          className="form-control"
                        /></div>
                          : <div className="col-md-6 ml-auto">{this.props.cliente.nombre}</div>)}

                      </div>
                    </li>
                    {(this.state.editMode ?
                      <div>
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-6 ml-auto"><b>Apellido 1</b></div>
                            <div className="col-md-6 ml-auto"><input name="apellido1" onChange={this.handleChange} type="text"
                              required
                              value={this.state.apellido1}
                              className="form-control"
                            /></div>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <div className="row">
                            <div className="col-md-6 ml-auto"><b>Apellido 2</b></div>
                            <div className="col-md-6 ml-auto"><input name="apellido2" onChange={this.handleChange} type="text"
                              required
                              value={this.state.apellido2}
                              className="form-control"
                            /></div>
                          </div>
                        </li>
                      </div>
                      :
                      <li className="list-group-item"><div className="row">
                        <div className="col-md-6 ml-auto"><b>Apellidos</b></div>
                        <div className="col-md-6 ml-auto">{this.props.cliente.apellido1 + " " + this.props.cliente.apellido2}</div>
                      </div></li>)}
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Direccion</b></div>
                        {(this.state.editMode ? <div className="col-md-6 ml-auto"><input name="direccion" onChange={this.handleChange} type="text"
                          required
                          value={this.state.direccion}
                          className="form-control"
                        /></div>
                          : <div className="col-md-6 ml-auto">{this.props.cliente.direccion}</div>)}

                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Telefono</b></div>
                        {(this.state.editMode ? <div className="col-md-6 ml-auto"><input name="telefono" onChange={this.handleChange} onKeyDown={this.handleKeypress} type="number"
                          required
                          value={this.state.telefono}
                          className="form-control"
                        /></div>
                          : <div className="col-md-6 ml-auto">{this.props.cliente.telefono}</div>)}
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Correo</b></div>
                        {(this.state.editMode ? <div className="col-md-6 ml-auto"><input name="correo" onChange={this.handleChange} type="email"
                          required
                          value={this.state.correo}
                          className="form-control"
                        /></div>
                          : <div className="col-md-6 ml-auto">{this.props.cliente.correo}</div>)}
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Fecha nacimiento</b></div>
                        {(this.state.editMode ? <div className="col-md-6 ml-auto"><input name="fechaNacimiento" onChange={this.handleChange} type="date"
                          required
                          value={moment(this.props.cliente.fechaNacimiento, "YYYY-MM-DD").locale("es").format("YYYY-MM-DD")}
                          className="form-control"
                        /></div>
                          : <div className="col-md-6 ml-auto">{moment(this.props.cliente.fechaNacimiento, "YYYY-MM-DD").locale("es").format("DD-MMM-YYYY")}</div>)}
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Ingresos</b></div>
                        {(this.state.editMode ? <div className="col-md-6 ml-auto"><input name="ingresos" onChange={this.handleChange} type="number"
                          required
                          value={this.state.ingresos}
                          className="form-control"
                        /></div>
                          : <div className="col-md-6 ml-auto">{this.props.cliente.ingresos}</div>)}

                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Egresos</b></div>
                        {(this.state.editMode ? <div className="col-md-6 ml-auto"><input name="egresos" onChange={this.handleChange} type="number"
                          required
                          value={this.state.egresos}
                          className="form-control"
                        /></div>
                          : <div className="col-md-6 ml-auto">{this.props.cliente.egresos}</div>)}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="modal-footer">
                {(this.state.editMode ? <button type="button" className="btn btn-success" onClick={this.editCliente}>Enviar</button>
                  : "")}
                {(this.state.editMode ? <button type="button" className="btn btn-danger" onClick={() => this.setState({ editMode: false })}>Cancelar</button>
                  : <button type="button" className="btn btn-warning" onClick={() => this.setState({ editMode: true })}>Editar</button>)}
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}