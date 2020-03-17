import React, { Component } from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2'
export default class VerCriterio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: true,
      idCriterio: '',
      idCategoria: '',
      nombre: '',
      descripcion: '',
      cobertura: '',
      deducible: ''

    }
    
    this.modalClose = this.modalClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editarCriterio = this.editarCriterio.bind(this);


  }

  modalClose() {
    $('#Criterio-' + this.categoriaCriterio() + this.props.criterio.nombre.replace(/ /g, "_")).modal('hide');
    $(document).on('hidden.bs.modal', '.modal', function () {
      if ($('body').find('.modal.show').length > 0) {
        $('body').addClass('modal-open');
      }
    });
  }

  categoriaCriterio() {
    if (this.props.nombre) {
      return this.props.nombre.replace(/ /g, "_") + "-"
    }
    return ""
  }
  componentDidMount(){

    if(this.props.categoria){
      this.setState({
        edit: true,
        idCriterio: this.props.criterio._id,
        
        idCategoria: this.props.categoria._id,
        nombre: this.props.criterio.nombre,
        descripcion: this.props.criterio.descripcion,
        cobertura: this.props.criterio.cobertura,
        deducible: this.props.criterio.deducible
      })
    }else{
      this.setState({
        edit: true,
        idCriterio: this.props.criterio._id,
        nombre: this.props.criterio.nombre,
        descripcion: this.props.criterio.descripcion,
        cobertura: this.props.criterio.cobertura,
        deducible: this.props.criterio.deducible
      })
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }
  editarCriterio(e) {
    e.preventDefault();
    fetch('/api/categorias/editCriterio', { 
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
          console.log(this.state);
          Swal.fire({
            text: data.mensaje,
            type: 'success',
            onClose: () => {
              location.reload();
            }
          })
        } else {
          Swal.fire({
            text: data.mensaje,
            type: 'error'
          })
        }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#Criterio-" + this.categoriaCriterio() + this.props.criterio.nombre.replace(/ /g, "_")}>Ver más</button>
        <div className="modal fade" id={"Criterio-" + this.categoriaCriterio() + this.props.criterio.nombre.replace(/ /g, "_")} tabIndex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title"><b>Criterio</b> {this.props.criterio.nombre}</h5>
                <button type="button" className="close" onClick={this.modalClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                  <div className="container">
                    <ul className="list-group">
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-md-6 ml-auto"><b>Nombre</b></div>
                          <input name="nombre" onChange={this.handleChange} type="text"
                            value={this.state.nombre}
                            className="form-control col-md-6 ml-auto"
                            disabled={this.state.edit}
                          />
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-md-6 ml-auto"><b>Descripcion</b></div>
                          <textarea name="descripcion" onChange={this.handleChange} type="text"
                            value={this.state.descripcion}
                            className="form-control col-md-6 ml-auto"
                            disabled={this.state.edit}
                          />
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-md-6 ml-auto"><b>Monto a cubrir</b></div>
                          <input name="cobertura" onChange={this.handleChange} type="text"
                            value={this.state.cobertura}
                            className="form-control col-md-6 ml-auto"
                            disabled={this.state.edit}
                          />
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-md-6 ml-auto"><b>Deducible</b></div>
                          <input name="deducible" onChange={this.handleChange} type="text"
                            value={this.state.deducible}
                            className="form-control col-md-6 ml-auto"
                            disabled={this.state.edit}
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
              </div>
              <div className="modal-footer">
                
                {(!this.state.edit ? <button type="button" className="btn btn-success" onClick={this.editarCriterio}>Enviar</button> 
                : "")}
                {(!this.state.edit ? <button type="button" className="btn btn-danger" onClick={()=>this.setState({edit: true})}>Cancelar</button> 
                : (this.props.session.esAdmin ? <button type="button" className="btn btn-warning" onClick={()=>this.setState({edit: false})}>Editar</button> : ""))}
                <button type="button" className="btn btn-secondary" onClick={this.modalClose}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}