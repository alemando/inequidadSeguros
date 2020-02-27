import React, { Component } from 'react';
import $ from 'jquery'
import Swal from 'sweetalert2'



export default class EditCategoria extends Component {

    constructor(props) {
        super();
        this.state = {
            nombre: props.categoria.nombre
        }
        this.editCategoria = this.editCategoria.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    editCategoria(e) {
        e.preventDefault();
        
        var url = '/api/categorias/update';
        var data = {"id": this.props.categoria._id,
                    "nombre":this.state.nombre};

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
            'Content-Type': 'application/json'
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
  
                    this.props.component.fetchCategorias();
                    
                    Swal.fire({
                      text: data.mensaje,
                      type: 'success',
                      onClose: () => {
                        location.reload();
                      }
                    })

                    $('#EditarCategoria-'+this.props.categoria._id).modal('hide');
  
                    this.setState({
                        nombre: ''
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
        });
    }



    render() {
        return(
        <div>
            <button type="button" className="btn btn-warning" data-toggle="modal"  data-target={'#EditarCategoria-' + this.props.categoria._id}>Editar categoria</button>
        
            <div className="modal fade" id={'EditarCategoria-' + this.props.categoria._id} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Editar categoria</b></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id={'formEditarCategoria-'+ this.props.categoria._id} onSubmit={this.editCategoria}>
                                <div className="form-group">
                                    <label>* Nombre:</label>
                                    <input name="nombre" onChange={this.handleChange} type="text" required
                                        value={this.state.nombre}
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
                            <button type="submit" form={'formEditarCategoria-'+ this.props.categoria._id} className="btn btn-primary">Enviar</button>
                            <button type="button" className="btn btn-secondary" onClick={this.modalClose} data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}