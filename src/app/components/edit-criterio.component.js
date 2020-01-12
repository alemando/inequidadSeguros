import React, { Component } from 'react';
import $ from 'jquery';

export default class EditCriterio extends Component {

    constructor(props){
        super(props);
        this.state = {
            index: '',
            nombre:'',
            descripcion:'',
            cobertura:0,
            deducible:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.editCriterio = this.editCriterio.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    modalClose(){
        $('#EditarCriterio-'+this.props.criterio.index).modal('hide');
        
        $(document).on('hidden.bs.modal', '.modal', function () {
            if ($('body').find('.modal.show').length > 0) {
                $('body').addClass('modal-open');
            }
        });
    }

    componentDidMount(){
        this.setState(
            {index: this.props.criterio.index,
            nombre: this.props.criterio.nombre,
            descripcion: this.props.criterio.descripcion,
            montoCubrir: this.props.criterio.cobertura,
            deducible: this.props.criterio.deducible})
    }

    editCriterio(){
        this.props.criterio.nombre = this.state.nombre;
        this.props.criterio.descripcion = this.state.descripcion;
        this.props.criterio.montoCubrir = this.state.cobertura;
        this.props.criterio.deducible = this.state.deducible;
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
            <button type="button" className="btn btn-warning  float-right" data-toggle="modal" data-target={"#EditarCriterio-"+this.props.criterio.index}>Editar</button>
        
            <div className="modal fade" id={"EditarCriterio-"+this.props.criterio.index} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Editar criterio</b></h5>
                            <button type="button" className="close" onClick={this.modalClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
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
                                <input name="cobertura" onChange={this.handleChange} type="number"
                                    required
                                    value={this.state.cobertura}
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this.editCriterio}  className="btn btn-primary">Enviar</button>
                            <button type="button" className="btn btn-secondary" onClick={this.modalClose} >Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}