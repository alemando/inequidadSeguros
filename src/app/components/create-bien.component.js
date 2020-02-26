import React, { Component } from 'react';
import $ from 'jquery'
import Swal from 'sweetalert2'
export default class CreateBien extends Component {

    constructor(){
        super();
        this.state = {
            nombre: '',
            cliente: '',
            categoria: '',
            caracteristicas: '',
            documentoInput: '',
            categorias: []
        }
        this.addBien = this.addBien.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.cargarCategorias = this.cargarCategorias.bind(this);
    }

    addBien(e){
        e.preventDefault();
        //Cast de los datos para enviar el documento y demas campos
        let formData = new FormData();
        formData.append('nombre', this.state.nombre);
        formData.append('cliente', this.state.cliente);
        formData.append('categoria', this.state.categoria);
        formData.append('caracteristicas', this.state.caracteristicas);
        formData.append('documento', e.target.documentoInput.files[0]);

        fetch('/api/bienes/save', {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
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
                
                Swal.fire({
                  text: data.mensaje,
                  type: 'success',
                  onClose: () => {
                    location.reload();
                  }
                })

                $("#CrearBien"+this.props.cliente).modal('hide');
                $("#formBien-"+this.props.cliente).reset();

                this.setState({
                  nombre: '',
                  categoria: '',
                  caracteristicas: '',
                  documentoInput: '',
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

    componentDidMount(){
      this.setState({cliente: this.props.cliente
      })
    }

    categorias(){
      return this.state.categorias.map(currentCategoria => {
        return <option key={currentCategoria._id} value={currentCategoria._id}>{currentCategoria.nombre}</option>;
      })
    }
    
    cargarCategorias(){
      fetch('/api/categorias/habilitadas', {
        method: 'GET'
      })
        .then(res => res.json())
        .then(data => {
          this.setState({ categorias: data });
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
          <button type="button" onClick={this.cargarCategorias} className="btn btn-success" data-toggle="modal" data-target={"#CrearBien"+this.props.cliente}>Crear bien</button>
          
          <div className="modal fade" id={"CrearBien"+this.props.cliente} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Crear un nuevo bien</b> {this.props.clienteInfo.nombre + " " + this.props.clienteInfo.apellido1 + " " + this.props.clienteInfo.apellido2}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form id={"formBien-"+this.props.cliente} onSubmit={this.addBien}>
                  <div className="form-group">
                    <label>* Nombre:</label>
                    <input name="nombre" onChange={this.handleChange} type="text"
                        required
                        value={this.state.nombre}
                        className="form-control"
                        />
                  </div>
                  <div className="form-group">
                    <label>* Categoria:</label>
                    <select name="categoria" onChange={this.handleChange}
                        required
                        value={this.state.categoria}
                        className="form-control">
                        <option  value=''>Seleccione...</option>
                        {this.categorias()}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>* Caracteristicas:</label>
                    <textarea
                      className="md-textarea form-control" 
                      name="caracteristicas" 
                      onChange={this.handleChange} 
                      value={this.state.caracteristicas}
                      rows="3">
                    </textarea>
                  </div>
                  <div className="form-group">
                    <label>* Documento:</label>
                    <input name="documentoInput" onChange={this.handleChange} type="file"
                        required
                        value={this.state.documentoInput}
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
                <button type="submit" form={"formBien-"+this.props.cliente} className="btn btn-primary">Enviar</button>
                <button type="button" className="btn btn-secondary" onClick={this.modalClose} data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
          
          
          
        </div>
        )
      }
}