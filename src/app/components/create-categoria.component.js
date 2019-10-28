import React, { Component } from 'react';
import Criterios from "./create-categoria-criterios.component.js";

export default class CreateCategoria extends Component {

    constructor() {
        super();
        this.state = {
            nombre: '',
            criterios: []
        }
        this.addCategoria = this.addCategoria.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCriterioChange = this.handleCriterioChange.bind(this);
    }

    addCategoria(e) {
        if(this.state.nombre==""){
            alert("La categoria debe tener un nombre");
        }else if(this.state.criterios.length==0){
            alert("Debe tener al menos un criterio")
        }else{
            e.preventDefault();
            fetch('/api/categorias/save', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        nombre: '',
                        criterios:[]
                    });
                    document.getElementById("form-categoria").reset(); 
                })
                .catch(err => console.error(err));
        }
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleCriterioChange(formCriterioState) {
        this.setState({
            criterios: [...this.state.criterios, formCriterioState]
        });
    }

    removeCriterio(index){
        if(window.confirm("¿Estas seguro de eliminar este criterio?")){
            this.setState({
                criterios: this.state.criterios.filter((e,i) => {
                    return i!=index
                })
            });
        }
    }

    render() {
        const criteriosActuales = this.state.criterios.map((criterio, i) => {
            return (
                <div key={i}>
                    <h4>Criterio {i}</h4>
                    <div className="form-group">
                        <div>
                            <label>* Nombre criterio:</label>
                            <input name="nombreCriterioFijo" type="text"
                                disabled={true}
                                className="form-control"
                                value={criterio.nombreCriterio}
                            />
                        </div>
                        <div>
                            <label>* Descripcion criterio:</label>
                            <textarea
                                disabled={true}
                                className="md-textarea form-control"
                                name="descripcionCriterioFijo"
                                value={criterio.descripcinCriterio}
                                rows="3">
                            </textarea>
                        </div>
                        <div>
                            <label>* Deducible del criterio:</label>
                            <input name="deducibleCriterioFijo" type="number"
                                disabled={true}
                                value={criterio.deducibleCriterio}
                                className="form-control"
                            />
                        </div>
                        <div className="mt">
                            <br></br>
                            <button type="button" className="btn btn-danger mt" onClick={this.removeCriterio.bind(this,i)}>
                                    Eliminar
                            </button>
                        </div>
                    </div>
                    <hr></hr>
                </div>
            )
        });
        /* RETURN */
        return (
            <div>
                <h3>Crear una nueva categoria</h3>
                <form onSubmit={this.addCategoria} id="form-categoria">
                    <div className="form-group">
                        <label>* Nombre:</label>
                        <input name="nombre" onChange={this.handleChange} type="text"
                            required={true}
                            value={this.state.nombre}
                            className="form-control"
                        />
                    </div>
                </form>
                {criteriosActuales}
                <Criterios handleData={this.handleCriterioChange} />
                <div className="form-group">
                    <button type="button" className="btn btn-success" onClick={this.addCategoria}>
                        Registrar Categoria
                </button>
                </div>
            </div>
        )
    }
}