import React, { Component } from 'react';
import $ from 'jquery';
export default class CreateCriterio extends Component {

    constructor(props){
        super(props);
        this.state = {
            nombre:'',
            descripcion:'',
            montoCubrir:0,
            deducible:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addCriterio = this.addCriterio.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    modalClose(){
        this.setState({
            nombre:'',
            descripcion:'',
            montoCubrir:0.0,
            deducible:''
        });
        $('#CrearCriterio').modal('hide');
    }

    addCriterio(e){
        e.preventDefault();
        this.props.component.addCriterio(this.state);
        this.modalClose()
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render(){
        return (
        <div>
            <button type="button" className="btn btn-success  float-right" data-toggle="modal" data-target="#CrearCriterio">Añadir criterio</button>
        
            <div className="modal fade" id="CrearCriterio" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Añadir criterio</b></h5>
                            <button type="button" className="close" onClick={this.modalClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <form onSubmit={this.addCriterio} id="formCriterio">
                            <div className="form-group">
                                <label>* Nombre:</label>
                                <input name="nombre" onChange={this.handleChange} type="text" 
                                    required 
                                    value={this.state.nombre}
                                    className="form-control"
                                    />
                            </div>
                            <div className="form-group">
                                <label>* Descripcion:</label>
                                <textarea
                                        required
                                        className="md-textarea form-control" 
                                        name="descripcion" 
                                        onChange={this.handleChange} 
                                        value={this.state.descripcion}
                                        rows="3">
                                </textarea>
                            </div>
                            <div className="form-group">
                                <label>* Monto a cubrir:</label>
                                <input name="montoCubrir" onChange={this.handleChange} type="number"
                                    required
                                    value={this.state.montoCubrir}
                                    className="form-control"
                                    />
                            </div>
                            <div className="form-group">
                                <label>* Deducible:</label>
                                <input name="deducible" onChange={this.handleChange} type="text"
                                    required
                                    value={this.state.deducible}
                                    className="form-control"
                                    />
                            </div>
                        </form> 
                        </div>
                        <div className="modal-footer">
                            <button type="submit" form="formCriterio" className="btn btn-primary">Enviar</button>
                            <button type="button" className="btn btn-secondary" onClick={this.modalClose} >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}