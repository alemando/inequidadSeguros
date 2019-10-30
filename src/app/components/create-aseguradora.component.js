import React, { Component } from 'react';
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
            .then(res => {
                res.json();
                
            })
            .then(data => {
                Swal.fire('Mensaje', '', data)
                this.setState({
                    nit: '',
                    nombre: '',
                    telefono: '',
                    correo: ''
                });
            })
            .catch(err => console.error(err));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <h3>Crear una nueva aseguradora</h3>
                <form onSubmit={this.addAseguradora}>
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
                        <input name="telefono" onChange={this.handleChange} type="text"
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
                        <button type="submit" className="btn btn-primary">
                            Enviar
              </button>
                    </div>
                </form>
            </div>
        )
    }
}
