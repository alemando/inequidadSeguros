import React, { Component } from 'react';
import $ from 'jquery'
import Swal from 'sweetalert2'



export default class EditContrasena extends Component {

    constructor(props) {
        super();
        this.state = {
            documento: props.vendedor._documento,
            contrasena: '',
            contrasenaNueva: ''
        }
        this.editContrasena = this.editContrasena.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    editContrasena(e) {
        e.preventDefault();
        
        var url = '/api/vendedores/update';
        var data = {"documento": this.props.vendedor._documento,
                    "contrasena": this.state.contrasena,
                    "contrasenaNueva": this.state.contrasenaNueva};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
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

                    $('#EditarContrasena-'+this.props.vendedor._documento).modal('hide');
  
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
            <button type="button" className="btn" data-toggle="modal"  data-target={'#EditarContrasena-' + this.props.vendedor._documento}><i className="fa fa-fw fa-key"></i></button>
        
            <div className="modal fade" id={'EditarContrasena-' + this.props.vendedor._documento} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Editar contraseña</b></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id={'formEditarContrasena-'+ this.props.vendedor._documento} onSubmit={this.editContrasena}>
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
                            <button type="submit" form={'formEditarContrasena-'+ this.props.vendedor._documento} className="btn btn-primary">Enviar</button>
                            <button type="button" className="btn btn-secondary" onClick={this.modalClose} data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}