import React, { Component } from 'react';

export default class CreateCliente extends Component {

    constructor(){
        super();
        this.state = {
            id: '',
            idCliente: '',
            categoria: '',
            caracteristicas: '',
            documentos: ''
        }
        this.addCliente = this.addCliente.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addCliente(e){
        e.preventDefault();
        fetch('/clientes/save', {
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
                  id: '',
                  idCliente: '',
                  categoria: '',
                  caracteristicas: '',
                  documentos: ''
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
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Nombre:</label>
              <input name="nombre" onChange={this.handleChange} type="text"
                  required
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Primer apellido:</label>
              <input name="apellido1" onChange={this.handleChange} type="text"
                  required
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Segundo apellido:</label>
              <input name="apellido2" onChange={this.handleChange} type="text"
                  required
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Dirección:</label>
              <input name="direccion" onChange={this.handleChange} type="text"
                  required
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Telefono:</label>
              <input name="telefono" onChange={this.handleChange} type="text"
                  required
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Fecha nacimineto:</label>
              <input name="fechaNacimiento" onChange={this.handleChange} type="date"
                  required
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Ingresos:</label>
              <input name="ingresos" onChange={this.handleChange} type="number"
                  required
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Egresos:</label>
              <input name="egresos" onChange={this.handleChange} type="number"
                  required
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