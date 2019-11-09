import React, { Component } from 'react';
import CreateCriterio from "./create-criterio-categoria.component";
import VerCriterio from "./ver-criterio.component"
import Swal from 'sweetalert2'

const Criterio = props => (
    <tr>
        <td>{props.criterio.nombre}</td>
        <td><VerCriterio criterio={props.criterio} key={props.criterio.mombre}/></td>
        <td><button type="button" className="btn btn-warning">Editar</button></td>
        <td><button type="button" onClick={() => props.component.removeCriterio(props.criterio.index)} className="btn btn-danger">X</button></td>
    </tr>
)

export default class CreateCategoria extends Component {

    constructor() {
        super();
        this.state = {
            nombre: '',
            criterios: []
        }
        this.addCategoria = this.addCategoria.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addCriterio = this.addCriterio.bind(this);
        this.removeCriterio = this.removeCriterio.bind(this);
    }

    criteriosList() {
        let index = 0;
        return this.state.criterios.map(currentCriterio => {
            currentCriterio["index"] = index
            index++;
          return <Criterio component={this} criterio={currentCriterio} key={currentCriterio.nombre} />;
        })
    }

    addCategoria(e) {
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
                if(data.id == 0){
                  
                    Swal.fire({
                      text: data.mensaje,
                      type: 'error'
                    })
                  }else if(data.id == 1){
  
                    this.props.component.fetchCategorias();
                    
                    Swal.fire({
                      text: data.mensaje,
                      type: 'success'
                    })
  
                    this.setState({
                        nombre: '',
                        criterios:[]
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

    addCriterio(criterio) {
        this.setState({criterios: [...this.state.criterios, criterio]})
    }

    removeCriterio(index){
        this.setState(state => {
            const criterios = state.criterios.filter((item, j) => index !== j);
            return {
                criterios
            };
        });
    }

    render() {
        return(
        <div>
            <button type="button" className="btn btn-primary  float-right" data-toggle="modal" data-target="#CrearCategoria">Crear categoria</button>
        
            <div className="modal fade" id="CrearCategoria" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"><b>Crear categoria</b></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="formCategoria" onSubmit={this.addCategoria}>
                                <div className="form-group">
                                    <label>* Nombre:</label>
                                    <input name="nombre" onChange={this.handleChange} type="text" required
                                        value={this.state.nombre}
                                        className="form-control"
                                        />
                                </div>
                                <h2>Criterios</h2>
                                <div className="container">
                                    <table className="table">
                                        <thead className="thead-light">
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Ver mas</th>
                                            <th>Editar</th>
                                            <th>Borrar</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.criteriosList()}
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" form="formCategoria" className="btn btn-primary">Enviar</button>
                            <CreateCriterio component={this}/>
                            <button type="button" className="btn btn-secondary" onClick={this.modalClose} data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}