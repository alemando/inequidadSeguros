import React, { Component } from 'react';
import Swal from 'sweetalert2';
import $ from 'jquery';

export default class CambiarContrasena extends Component {
	constructor() {
    super();
    this.state = {
      vendedorId:'',
      contrasenaNueva:'',
      confirmar:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.cambiarContra = this.cambiarContra.bind(this);

  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  componentDidMount(){
    this.setState({
      vendedorId: this.props.usuario._id
    })
  }

  cambiarContra() {
    if(this.state.contrasenaNueva!="" && this.state.confirmar!="" && this.state.contrasenaNueva==this.state.confirmar){
      fetch('/api/vendedores/cambiarContrasenaAdmin', {
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
            console.log(data.mensaje);
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
}

	render() {
		return(
			<div>
	        <button type="button" className="btn btn-info" data-toggle="modal" data-target={"#contra" + this.props.usuario.documento}>Cambiar Contraseña</button>
	        <div className="modal fade" id={"contra" + this.props.usuario.documento} tabIndex="-1" role="dialog" aria-hidden="true">
	          <div className="modal-dialog" role="document">
	            <div className="modal-content">
	              <div className="modal-header">
                  <h5 className="modal-title"><b>Cambiar contraseña de {this.props.usuario.nombre}</b></h5>
	                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
	                  <span aria-hidden="true">&times;</span>
	                </button>
	              </div>
	              <div className="modal-body">
	                <div className="container">
	                  <ul className="list-group">

	                    <li className="list-group-item">
	                      <div className="row">
	                        <div className="col-md-6"><b>Nueva contraseña</b></div>
                          <div className="col-md-6">
	                        <input name="contrasenaNueva" onChange={this.handleChange} type="password" required
                                            value={this.state.contrasenaNueva}
                                            className="form-control"
                                        /> 
                          </div>
	                      </div>
	                    </li>

                      <li className="list-group-item">
	                      <div className="row">
	                        <div className="col-md-6"><b>Repetir contraseña</b></div>
                          <div className="col-md-6">
                            <input name="confirmar" onChange={this.handleChange} type="password" required
                                            value={this.state.confirmar}
                                            className="form-control"
                                        /> 
                          </div>
	                      </div>
	                    </li>
                  
	                  </ul>
	                </div>
	              </div>
	              <div className="modal-footer">
	              		<button type="button" className="btn btn-success" onClick={this.cambiarContra}>Cambiar</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal">Cancelar</button>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>
		)
	}
}