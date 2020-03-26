import React, { Component } from 'react';
import $ from 'jquery';
export default class CreateCriterio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre:'',
            descripcion:'',
            cobertura:0,
            deducible:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addCriterio = this.addCriterio.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    modalClose() {
        this.setState({
            nombre:'',
            descripcion:'',
            cobertura:0,
            deducible:''
        });
        $("#CrearCriterio").modal('hide');
        $(document).on('hidden.bs.modal', '.modal', function () {
            if ($('body').find('.modal.show').length > 0) {
                $('body').addClass('modal-open');
            }
        });
    }

    addCriterio(e) {
        e.preventDefault();
        this.props.component.addCriterio(this.state);
        this.modalClose()
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleKeypress(e) {
        const characterCode = e.key
        if (characterCode === 'Backspace') return

        const characterNumber = Number(characterCode)
        if (characterNumber >= 0 && characterNumber <= 9) {
            if (e.currentTarget.value && e.currentTarget.value.length) {
                return
            }
        } else {
            e.preventDefault()
        }
    }

    activateButton(bien){
        if(bien == ''){
            return true
        }else{
            return false
        }
    }

    render() {
        return (
            <div>
    <button type="button" className="btn btn-success  float-right" data-toggle="modal" data-target="#CrearCriterio" disabled={this.activateButton(this.props.bien)} >Añadir criterio</button>

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
                                        <input name="cobertura" onChange={this.handleChange} type="numer" onKeyDown={this.handleKeypress} min="0"
                                            required
                                            value={this.state.cobertura}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>* Deducible:</label>
                                        <input name="deducible" onChange={this.handleChange} type="text"
                                            required
                                            placeholder="Porcentaje o valor que el cliente asumirá al reclamar este criterio"
                                            value={this.state.deducible}
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
                                <button type="submit" form="formCriterio" className="btn btn-primary">Enviar</button>
                                <button type="button" className="btn btn-secondary" onClick={this.modalClose} >Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}