import React, { Component } from 'react';

export default class CreateVendedor extends Component {

    constructor(){
        super();
        this.state = {
            documentoIdentidad: '',
            nombre: '',
            apellido1: '',
            apellido2: '',
            numContacto: '',
            es_admin: ''
        }
        this.addVendedor = this.addVendedor.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                console.log(data);
                this.setState({
                    documentoIdentidad: '',
                    nombre: '',
                    apellido1: '',
                    apellido2: '',
                    numContacto: '',
                    esAdmin: ''
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
        return(
        <div>
            <h3>Crear un vendedor</h3>
            <form onSubmit={this.addVendedor}>
                <div className="form-group">
                <label>* Numero de documento:</label>
                <input name="documento" onChange={this.handleChange} type="number" required
                    value={this.state.documento}
                    className="form-control"
                    />
                </div>
                <div className="form-group">
              <label>* Nombres:</label>
              <input name="nombre" onChange={this.handleChange} type="text" required
                  value={this.state.nombre}
                  className="form-control" pattern="[A-Za-z]"
                  />
            </div>
            <div className="form-group">
              <label>* Primer apellido:</label>
              <input name="apellido1" onChange={this.handleChange} type="text" required
                  value={this.state.apellido1}
                  className="form-control" pattern="[A-Za-z]"
                  />
            </div>
            <div className="form-group">
              <label>  Segundo apellido:</label>
              <input name="apellido2" onChange={this.handleChange} type="text" 
                  value={this.state.apellido2}
                  className="form-control" pattern="[A-Za-z]"
                  />
            </div>
            <div className="form-group">
              <label>* Dirección de correo electronico:</label>
              <input name="direccion" onChange={this.handleChange} type="email" required
                  value={this.state.direccion}
                  className="form-control" 
                  />
            </div>
            <div className="form-group">
              <label>* Telefono:</label>
              <input name="telefono" onChange={this.handleChange} type="number" required
                  value={this.state.telefono}
                  className="form-control"
                  />
            </div>              
            <div className="form-group">
              <label>  Es administrador:</label>
              <input name="es_admin" onChange={this.handleChange} type="checkbox" 
                  value={this.state.es_admin}
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                  Crear
              </button>
            </div>
            </form>
        </div>
        
        )
    }


}