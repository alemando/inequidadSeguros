import React, { Component } from 'react';

export default class crearCrierio extends Component {

    constructor(props){
        super(props);
        this.state = {
            nombreCriterio:'',
            descripcionCriterio:'',
            deducibleCriterio:0.0
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitFormCriterio = this.submitFormCriterio.bind(this);
    }

    submitFormCriterio(e){
        e.preventDefault();
        this.props.handleData(this.state);
        this.setState({
            nombreCriterio:'',
            descripcionCriterio:'',
            deducibleCriterio:0.0
        });
        document.getElementById("form-criterio").reset(); 
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
                <h4>Añadir nuevo criterio</h4>
                <form onSubmit={this.submitFormCriterio} id="form-criterio">
                    <div className="form-group">
                        <div>
                            <label>* Nombre criterio:</label>
                            <input name="nombreCriterio" onChange={this.handleChange} type="text"
                                required={true}
                                className="form-control"
                                />
                        </div>
                        <div>
                            <label>* Descripcion criterio:</label>
                            <textarea
                                    required={true}
                                    className="md-textarea form-control" 
                                    name="descripcionCriterio" 
                                    onChange={this.handleChange} 
                                    rows="3">
                            </textarea>
                        </div>
                        <div>
                            <label>* Deducible del criterio:</label>
                            <input name="deducibleCriterio" onChange={this.handleChange} type="number"
                                required={true}
                                className="form-control"
                                />
                        </div>
                    </div>
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Registrar criterio
                    </button>
                    </div>
                </form> 
            </div>
        );
    }
}