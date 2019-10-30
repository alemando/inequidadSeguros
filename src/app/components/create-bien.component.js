import React, { Component } from 'react';

export default class CreateBien extends Component {

    constructor(){
        super();
        this.state = {
            id: '',
            documentoCliente: '',
            categoria: '',
            caracteristicas: '',
            documentos: ''
        }
        this.addBien = this.addBien.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addBien(e){
        e.preventDefault();
        fetch('/api/bienes/save', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept' : '*/*',
                'Content-Type': 'application/octet-stream',
                'Content-Length': '23735',
                'Accept-Encoding': 'gzip, deflate,7bit'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                  id: '',
                  documentoCliente: '',
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
          <h3>Crear un nuevo Bien</h3>
          <form onSubmit={this.addBien} encType='multipart/form-data'>
            <div className="form-group">
              <label>* Id:</label>
              <input name="id" onChange={this.handleChange} type="text"
                  required
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Documento Cliente</label>
              <input name="documentoCliente" onChange={this.handleChange} type="text"
                  required
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Categoria:</label>
              <input name="categoria" onChange={this.handleChange} type="text"
                  required
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Caracteristicas:</label>
              <input name="caracteristicas" onChange={this.handleChange} type="text"
                  required
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Documentos:</label>
              <input name="documentos" onChange={this.handleChange} type="file"
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