import React, { Component } from 'react';

export default class CreateCliente extends Component {

    constructor(){
        super();
        this.state = {
            documentoVendedor: '',
            documentoCliente: '',
            idBien: '',
            nitAseguradora: '',
            fechaInicio: '',
            fechaFin: '',
            valorTotal: 0,
            fechaPago: 0,
            estado: '',
            observaciones: ''
        }
        this.addSeguro = this.addSeguro.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    addSeguro(e){
        e.preventDefault();
        fetch('/api/seguros/save', {
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
                    documentoVendedor: '',
                    documentoCliente: '',
                    idBien: '',
                    nitAseguradora: '',
                    fechaInicio: '',
                    fechaFin: '',
                    valorTotal: 0,
                    fechaPago: 0,
                    estado: '',
                    observaciones: ''
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
          <h3>Crear un nuevo seguro</h3>
          <form onSubmit={this.addSeguro}>

            <div className="form-group">
              <label>* Documento vendedor:</label>
              <input name="documentoVendedor" onChange={this.handleChange} type="text"
                  required
                  value={this.state.documentoVendedor}
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Documento cliente:</label>
              <input name="documentoCliente" onChange={this.handleChange} type="text"
                  required
                  value={this.state.documentoCliente}
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Id bien:</label>
              <input name="idBien" onChange={this.handleChange} type="text"
                  required
                  value={this.state.idBien}
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Nit aseguradora:</label>
              <input name="nitAseguradora" onChange={this.handleChange} type="text"
                  required
                  value={this.state.nitAseguradora}
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Fecha inicio:</label>
              <input name="fechaInicio" onChange={this.handleChange} type="date"
                  required
                  value={this.state.fechaInicio}
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Fecha fin:</label>
              <input name="fechaFin" onChange={this.handleChange} type="date"
                  required
                  value={this.state.fechaFin}
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Valor total:</label>
              <input name="valorTotal" onChange={this.handleChange} type="number"
                  required
                  value={this.state.valorTotal}
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Fecha pago:</label>
              <input name="fechaPago" onChange={this.handleChange} type="text"
                  required
                  value={this.state.fechaPago}
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Estado:</label>
              <input name="estado" onChange={this.handleChange} type="text"
                  required
                  value={this.state.estado}
                  className="form-control"
                  />
            </div>
            <div className="form-group">
              <label>* Observaciones:</label>
              <input name="observaciones" onChange={this.handleChange} type="text"
                  required
                  value={this.state.observaciones}
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
