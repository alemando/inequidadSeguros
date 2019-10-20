import React, { Component } from 'react';

export default class CreateCategoria extends Component {

    constructor(){
        super();
        this.state = {
            nombre: ''
        }
        this.addCategoria = this.addCategoria.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addCategoria(e){
        e.preventDefault();
        fetch('/categorias/save', {
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
                    nombre: ''
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
          <h3>Crear una nueva categoria</h3>
          <form onSubmit={this.addCategoria}>
            <div className="form-group">
              <label>* Nombre:</label>
              <input name="nombre" onChange={this.handleChange} type="text"
                  required
                  value={this.state.nombre}
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