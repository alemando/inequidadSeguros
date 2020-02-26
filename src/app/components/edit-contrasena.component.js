import React, { Component } from 'react';
import $ from 'jquery'
import Swal from 'sweetalert2'



export default class EditContrasena extends Component {

    constructor() {
        super();
        this.state = {
            contrasena: '',
            contrasenaNueva: ''
        }
        this.editContrasena = this.editContrasena.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    editContrasena(e) {
        e.preventDefault();
        fetch('/api/vendedores/update', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers:{
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
  
                    this.props.component.fetchContrasena();
                    
                    Swal.fire({
                      text: data.mensaje,
                      type: 'success'
                    })

                    $('#EditarContrasena').modal('hide');
  
                    this.setState({
                        contrasena: '',
                        contrasenaNueva: ''
                    });

                  }else{
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
        });
    }



    render() {
        return(
        <div>
            <div className="modal fade" id='EditarContrasena' tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Editar contraseña</b></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id={'formEditarContrasena'} onSubmit={this.editContrasena}>
                                <div className="form-group">
                                    <label>* Contrasena:</label>
                                    <input name="contrasena" onChange={this.handleChange} type="text" required
                                        value={this.state.contrasena}
                                        className="form-control"
                                        />
                                </div>
                                <div className="form-group">
                                    <label>* Nueva contrasena:</label>
                                    <input name="contrasenaNueva" onChange={this.handleChange} type="text" required
                                        value={this.state.contrasenaNueva}
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
                            <button type="submit" form={'formEditarContrasena'} className="btn btn-primary">Enviar</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}