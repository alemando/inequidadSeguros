import React, { Component } from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2'

export default class CreateVendedor extends Component {

    constructor() {
        super();
        this.state = {
            type: 'password',
            documento: '',
            nombre: '',
            apellido1: '',
            apellido2: '',
            telefono: '',
            correo: '',
            password: '',
            admin: true
        }
        this.showHide = this.showHide.bind(this);
        this.addVendedor = this.addVendedor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.showHide = this.showHide.bind(this);
        this.generar = this.generar.bind(this);
    }
    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        })
    }
    modalClose() {
        this.setState({
            documento: '',
            nombre: '',
            apellido1: '',
            apellido2: '',
            telefono: '',
            correo: '',
            password: '',
            admin: true
        });
    }

    addVendedor(e) {
        e.preventDefault();
        fetch('/api/vendedores/save', {
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

                    this.props.component.fetchVendedores();

                    Swal.fire({
                        text: data.mensaje,
                        type: 'success',
                        onClose: () => {
                            location.reload();
                        }
                    })

                    $("#CrearVendedor").modal('hide');
                    $("#formVendedor").reset();

                    this.setState({
                        documento: '',
                        nombre: '',
                        apellido1: '',
                        apellido2: '',
                        telefono: '',
                        correo: '',
                        password: '',
                        admin: true

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
    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        })
    }
    generar() {
        var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789!#$%&/()=?¡¿-|*+";
        var contraseña = "";
        for (i = 0; i < 12; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        this.setState({
            password: contraseña
        })
    }

    render() {
        return (
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
                                        <label> Segundo apellido:</label>
                                        <input name="apellido2" onChange={this.handleChange} type="text"
                                            value={this.state.apellido2}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>* Telefono:</label>
                                        <input name="telefono" onChange={this.handleChange} onKeyDown={this.handleKeypress} type="number" required
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
                                    <div className="form-group">
                                        <label>* Contraseña:</label>
                                        <input name="password" onChange={this.handleChange} type={this.state.type} required
                                            value={this.state.password}
                                            className="form-control"
                                        />
                                        <span className="btn btn-light" onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}</span>
                                        <span className="btn btn-light" onClick={this.generar}>Generar contraseña</span>
                                    </div>
                                    <div className="form-group">
                                        <label>* Tipo de empleado:</label>
                                        <select name="admin" onChange={this.handleChange}
                                            required
                                            value={this.state.admin}
                                            className="form-control">
                                            <option  value= {true}>Administrador</option>
                                            <option  value= {false}>Vendedor</option>
                                        </select>
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
                                <button type="submit" form="formVendedor" className="btn btn-primary">Enviar</button>
                                <button type="button" className="btn btn-secondary" onClick={this.modalClose} data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}