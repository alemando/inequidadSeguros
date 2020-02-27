import React, { Component } from 'react';
import Swal from 'sweetalert2'

export default class VerVendedor extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,
      documento: '',
      nombre: '',
      apellido1: '',
      apellido2: '',
      telefono: '',
      correo: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.editVendedor = this.editVendedor.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  componentDidMount(){
    this.setState({
      editMode: false,
      documento: this.props.vendedor.documento,
      nombre: this.props.vendedor.nombre,
      apellido1: this.props.vendedor.apellido1,
      apellido2: this.props.vendedor.apellido2,
      telefono: this.props.vendedor.telefono,
      correo: this.props.vendedor.correo
    })
  }

  editVendedor() {
    fetch('/api/vendedores/edit', {
        method: 'POST',
        body: JSON.stringify(this.state),
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

              this.props.component.fetchVendedores();
              
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
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Vendedor" + this.props.vendedor.documento}>Ver más</button>
        <div className="modal fade" id={"Vendedor" + this.props.vendedor.documento} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Vendedor</b> {this.props.vendedor.nombre + " " + this.props.vendedor.apellido1 + " " + this.props.vendedor.apellido2}</h5>
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
                        <div className="col-md-6 ml-auto">{this.props.vendedor.documento}</div>
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Nombres</b></div>
                        {(this.state.editMode ? <input name="nombre" onChange={this.handleChange} type="text" required
                                            value={this.state.nombre}
                                            className="form-control"
                                        /> 
                        : <div className="col-md-6 ml-auto">{this.state.nombre}</div>)}
                        
                        
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Apellidos</b></div>
                        {(this.state.editMode ? <input name="apellido1" onChange={this.handleChange} type="text" required
                                            value={this.state.apellido1}
                                            className="form-control"
                                        />
                        : <div className="col-md-6 ml-auto">{this.state.apellido1 + " " + this.state.apellido2}</div>)}
                        {(this.state.editMode ? <input name="apellido2" onChange={this.handleChange} type="text"
                                            value={this.state.apellido2}
                                            className="form-control"
                                        />
                        : "")}
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Telefono</b></div>
                        {(this.state.editMode ? <input name="telefono" onChange={this.handleChange} onKeyDown={this.handleKeypress} type="number" required
                                            value={this.state.telefono}
                                            className="form-control"
                                        />
                        : <div className="col-md-6 ml-auto">{this.state.telefono}</div>)}
                        
                      </div>
                    </li>
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col-md-6 ml-auto"><b>Correo</b></div>
                        {(this.state.editMode ? <input name="correo" onChange={this.handleChange} type="email" required
                                            value={this.state.correo}
                                            className="form-control"
                                        />
                        : <div className="col-md-6 ml-auto">{this.state.correo}</div>)}
                        
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="modal-footer">
                {(this.state.editMode ? <button type="button" className="btn btn-success" onClick={this.editVendedor}>Enviar</button> 
                : "")}
                {(this.state.editMode ? <button type="button" className="btn btn-danger" onClick={()=>this.setState({editMode: false})}>Cancelar</button> 
                : <button type="button" className="btn btn-warning" onClick={()=>this.setState({editMode: true})}>Editar</button>)}
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}