import React, { Component } from 'react';
import CreateSeguro from "./create-seguro.component";
import VerSeguro from "./ver-seguro.component";

const Seguro = props => (
  <tr>
    <td>{props.seguro.cliente.nombre+" "+props.seguro.cliente.apellido1+" "+props.seguro.cliente.apellido2 }</td>
    <td>{props.seguro.bien.nombre}</td>
    <td>{props.seguro.aseguradora.nombre}</td>
    <td>{props.seguro.vendedor.nombre+" "+props.seguro.vendedor.apellido1+" "+props.seguro.vendedor.apellido2 }</td>
    <td><center><VerSeguro seguro={props.seguro} key={props.seguro._id}/></center></td>
  </tr>
)

export default class SegurosList extends Component {
  constructor() {
    super();

    this.state = {seguros: []};
  }

    segurosList() {
        return this.state.seguros.map(currentSeguro => {
            return <Seguro seguro={currentSeguro} key={currentSeguro._id}/>;
        })
    }


    componentDidMount(){
        this.fetchSeguros();
    }

    fetchSeguros() {
        fetch('/api/seguros')
            .then(res => res.json())
            .then(data => {
                this.setState({seguros: data});
            })
            .catch(err => console.error(err));
    }


  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div className="card mb-3">
            <div className="card-header">
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-8 col-lg-10 col-xl-10">
                        <h3><i className="fa fa-shield"></i> Seguros disponibles</h3>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 col-xl-2">
                        <CreateSeguro component={this}/>
                    </div>
                </div>
            </div>
                
            <div className="card-body">
                <div className="table-responsive">
                <table id="tabla-seguros" className="table table-bordered table-hover display">
                    <thead>
                        <tr>
                            <th><center>Cliente</center></th>
                            <th><center>Bien</center></th>
                            <th><center>Aseguradora</center></th>
                            <th><center>Vendedor</center></th>
                            <th><center>Ver mas</center></th>
                        </tr>
                    </thead>                                        
                    <tbody>
                        { this.segurosList() }
                    </tbody>
                </table>
                </div>
                
            </div>                                                      
        </div>
      </div>  
    )
  }
}
