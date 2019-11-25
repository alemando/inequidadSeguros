import React, { Component } from 'react';
import Swal from 'sweetalert2'

export default class CreateVendedor extends Component {

    constructor(){
        super();
        this.state = {
            documento: '',
            nombre: '',
            apellido1: '',
            apellido2: '',
            telefono: '',
            correo: ''
        }
        this.addVendedor = this.addVendedor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }
    
    modalClose(){
        this.setState({
            documento: '',
            nombre: '',
            apellido1: '',
            apellido2: '',
            telefono: '',
            correo: ''
        });
    }

    addVendedor(e){
        e.preventDefault();
        fetch('/api/vendedores/save', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept' : 'application/json',
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
                    type: 'success'
                  })

                  this.setState({
                    documento: '',
                    nombre: '',
                    apellido1: '',
                    apellido2: '',
                    telefono: '',
                    correo: ''
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


    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
        <div>
        <button type="button" className="btn btn-primary  float-right" data-toggle="modal" data-target="#CrearVendedor">Crear vendedor</button>
        
        <div className="modal fade" id="CrearVendedor" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><b>Crear vendedor</b></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form id="formVendedor" onSubmit={this.addVendedor}>
                            <div className="form-group">
                                <label>* Numero de documento:</label>
                                <input name="documento" onChange={this.handleChange} type="text" required
                                    value={this.state.documento}
                                    className="form-control"
                                    />
                            </div>
                            <div className="form-group">
                                <label>* Nombres:</label>
                                <input name="nombre" onChange={this.handleChange} type="text" required
                                    value={this.state.nombre}
                                    className="form-control"
                                    />
                            </div>
                            <div className="form-group">
                                <label>* Primer apellido:</label>
                                <input name="apellido1" onChange={this.handleChange} type="text" required
                                    value={this.state.apellido1}
                                    className="form-control"
                                    />
                            </div>
                            <div className="form-group">
                                <label>  Segundo apellido:</label>
                                <input name="apellido2" onChange={this.handleChange} type="text" required
                                    value={this.state.apellido2}
                                    className="form-control"
                                    />
                            </div>            
                            <div className="form-group">
                                <label>* Telefono:</label>
                                <input name="telefono" onChange={this.handleChange} type="text" required
                                    value={this.state.telefono}
                                    className="form-control"
                                    />
                            </div>
                            <div className="form-group">
                                <label>* Correo:</label>
                                <input name="correo" onChange={this.handleChange} type="email" required
                                    value={this.state.correo}
                                    className="form-control"
                                    />
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" form="formVendedor" className="btn btn-primary">Enviar</button>
                            <button type="button" className="btn btn-secondary" onClick={this.modalClose} data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }


}