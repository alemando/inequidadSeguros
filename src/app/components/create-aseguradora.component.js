import React, { Component } from 'react';
import $ from 'jquery'
import Swal from 'sweetalert2'
export default class CreateAseguradora extends Component {

    constructor() {
        super();
        this.state = {
            nit: '',
            nombre: '',
            telefono: '',
            correo: ''
        }
        this.addAseguradora = this.addAseguradora.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
    }

    modalClose() {
        this.setState({
            nit: '',
            nombre: '',
            telefono: '',
            correo: ''
        });
    }

    addAseguradora(e) {
        e.preventDefault();
        fetch('/api/aseguradoras/save', {
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

                  this.props.component.fetchAseguradoras();
                  
                  Swal.fire({
                    text: data.mensaje,
                    type: 'success',
                    onClose: () => {
                      location.reload();
                    }
                  })

                  $("#CrearAseguradora").modal('hide');
                  $("#formAseguradora").reset();

                  this.setState({
                    nit: '',
                    nombre: '',
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

            <button type="button" className="btn btn-primary  float-right" data-toggle="modal" data-target="#CrearAseguradora">Crear aseguradora</button>
            
            <div className="modal fade" id="CrearAseguradora" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"><b>Crear una nueva aseguradora</b></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="formAseguradora" onSubmit={this.addAseguradora}>
                                    <div className="form-group">
                                        <label>* Nit:</label>
                                        <input name="nit" onChange={this.handleChange} type="text"
                                            required
                                            value={this.state.nit}
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
                                <button type="submit" form="formAseguradora" className="btn btn-primary">Enviar</button>
                                <button type="button" className="btn btn-secondary" onClick={this.modalClose} data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
