import React, { Component } from 'react';
import $ from 'jquery';

export default class EditContrasena extends Component {

    constructor(props){
        super(props);
        this.state = {
            contrasena: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.editCriterio = this.editCriterio.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    modalClose(){
        $('#EditarContrasena-'+this.props.contrasena.index).modal('hide');
        
        $(document).on('hidden.bs.modal', '.modal', function () {
            if ($('body').find('.modal.show').length > 0) {
                $('body').addClass('modal-open');
            }
        });
    }

    componentDidMount(){
        this.setState(
            {contrasena: this.props.criterio.contrasena})
    }

    editCriterio(){
        this.props.criterio.contrasena = this.state.contrasena;
        this.props.component.forceUpdate();
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
            <button type="button" className="btn btn-warning  float-right" data-toggle="modal" data-target={"#EditarContrasena-"+this.props.criterio.index}>Editar</button>
        
            <div className="modal fade" id={"EditarContrasena-"+this.props.criterio.index} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Editar contraseña</b></h5>
                            <button type="button" className="close" onClick={this.modalClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>* Contraseña:</label>
                                <input name="contrasena" onChange={this.handleChange} type="text" 
                                    required 
                                    value={this.state.contrasena}
                                    className="form-control"
                                    />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.EditContrasena}  className="btn btn-primary">Enviar</button>
                            <button type="button" className="btn btn-secondary" onClick={this.modalClose} >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}