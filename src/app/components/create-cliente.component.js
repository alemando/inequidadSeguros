import React, { Component } from 'react';


export default class CreateCliente extends Component {

    constructor(){
        super();
        this.state = {
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
        }
        this.addCliente = this.addCliente.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addCliente(e){
        e.preventDefault();
        fetch('/api/clientes/save', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
        return (
        <div>
          <h3>Crear un nuevo cliente</h3>
          <form onSubmit={this.addCliente}>
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
              <label>* Segundo apellido:</label>
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